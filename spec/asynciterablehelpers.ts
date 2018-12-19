import * as Ix from './Ix';
import * as test from 'tape';

export async function hasNext<T>(t: test.Test, source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  t.false(done, 'should not be done');
  t.deepEqual(value, expected);
}

export async function noNext<T>(t: test.Test, source: AsyncIterator<T>) {
  const next = await source.next();
  t.true(next.done, 'should be done');
}

export function delayValue<T>(item: T, delay: number): Promise<T> {
  return new Promise<T>(res => {
    let id: any = setInterval(() => {
      clearInterval(id);
      id = undefined;
      res(item);
    }, delay);
  });
}

const pipe = Ix.AsyncIterable.prototype.pipe;
const operatorNamesMap = Object.keys(Ix.asynciterable).reduce(
  (map, name) => map.set((Ix.asynciterable as any)[name], name),
  new Map<Function, string>()
);

export function testOperator<Op>(op: Op) {
  const ops = ((Array.isArray(op) ? op : [op]) as any) as Function[];
  const internalNames = ops.map(op => operatorNamesMap.get(op)!);
  const fnNames = internalNames.map(name => name.replace('_', ''));
  const pipeFns = internalNames.map(name => (Ix.asynciterablePipe as any)[name]);
  return function operatorTest(
    message: string,
    testFn: (t: test.Test, op: Op) => any | Promise<any>
  ) {
    test(`(fp) ${message}`, async t => await (testFn as any)(t, ops));
    test(`(proto) ${message}`, async t => await (testFn as any)(t, fnNames.map(wrapProto)));
    if (pipeFns.every(xs => typeof xs === 'function')) {
      test(`(pipe) ${message}`, async t => await (testFn as any)(t, pipeFns.map(wrapPipe)));
    }
  };
}

function wrapProto(name: string) {
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
  return source instanceof Ix.AsyncIterable ? source : Ix.AsyncIterable.as(source);
}
