import * as Ix from './Ix';
import * as test from 'tape-async';

export function hasNext<T>(t: test.Test, source: Iterator<T>, expected: T) {
  const { done, value } = source.next();
  t.false(done, 'should not be done');
  t.deepEqual(value, expected);
}

export function noNext<T>(t: test.Test, source: Iterator<T>) {
  const next = source.next();
  t.true(next.done, 'should be done');
}

const pipe = Ix.Iterable.prototype.pipe;
const operatorNamesMap = Object.keys(Ix.iterable).reduce(
  (map, name) => map.set((Ix.iterable as any)[name], name),
  new Map<Function, string>()
);

export function testOperator<Op>(op: Op) {
  const ops = ((Array.isArray(op) ? op : [op]) as any) as Function[];
  const internalNames = ops.map(op => operatorNamesMap.get(op)!);
  const fnNames = internalNames.map(name => name.replace('_', ''));
  const pipeFns = internalNames.map(name => (Ix.iterablePipe as any)[name]);
  return function operatorTest(
    message: string,
    testFn: (t: test.Test, op: Op) => any | Promise<any>
  ) {
    test(`(fp) ${message}`, t => (testFn as any)(t, ops));
    test(`(proto) ${message}`, t => (testFn as any)(t, fnNames.map(wrapProto)));
    if (pipeFns.every(xs => typeof xs === 'function')) {
      test(`(pipe) ${message}`, t => (testFn as any)(t, pipeFns.map(wrapPipe)));
    }
  };
}

function wrapProto(name: any) {
  return function(source: any, ...args: any[]) {
    return typeof source !== 'function'
      ? cast(source)[name].apply(source, args)
      : cast(args[0])[name].apply(args[0], [source, ...args.slice(1)]);
  };
}

function wrapPipe(fn: any) {
  return function(source: any, ...args: any[]) {
    return typeof source !== 'function'
      ? pipe.call(source, fn(...args))
      : pipe.call(args[0], fn(source, ...args.slice(1)));
  };
}

function cast(source: any): any {
  return source instanceof Ix.Iterable ? source : Ix.Iterable.as(source);
}
