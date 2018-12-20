import { Iterable, iterable, iterablePipe } from './Ix';

export function hasNext<T>(source: Iterator<T>, expected: T) {
  const { done, value } = source.next();
  expect(done).toBeFalsy();
  expect(value).toEqual(expected);
}

export function noNext<T>(source: Iterator<T>) {
  const next = source.next();
  expect(next.done).toBeTruthy();
}

const pipe = Iterable.prototype.pipe;
const operatorNamesMap = Object.keys(iterable).reduce(
  (map, name) => map.set((iterable as any)[name], name),
  new Map<Function, string>()
);

export function testOperator<Op>(op: Op) {
  const ops = ((Array.isArray(op) ? op : [op]) as any) as Function[];
  const internalNames = ops.map(op => operatorNamesMap.get(op)!);
  const fnNames = internalNames.map(name => name.replace('_', ''));
  const pipeFns = internalNames.map(name => (iterablePipe as any)[name]);
  return function operatorTest(message: string, testFn: (op: Op) => any | Promise<any>) {
    test(`(fp) ${message}`, () => (testFn as any)(ops));
    test(`(proto) ${message}`, () => (testFn as any)(fnNames.map(wrapProto)));
    if (pipeFns.every(xs => typeof xs === 'function')) {
      test(`(pipe) ${message}`, () => (testFn as any)(pipeFns.map(wrapPipe)));
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
  return source instanceof Iterable ? source : Iterable.as(source);
}
