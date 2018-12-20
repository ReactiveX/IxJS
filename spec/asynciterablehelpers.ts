import * as Ix from './Ix';

export async function hasNext<T>(source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  expect(done).toBeFalsy();
  expect(value).toEqual(expected);
}

export async function noNext<T>(source: AsyncIterator<T>) {
  const next = await source.next();
  expect(next.done).toBeTruthy();
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
  return function operatorTest(message: string, testFn: (op: Op) => any | Promise<any>, timeout?: number) {
    test(`(fp) ${message}`, async () => await (testFn as any)(ops), timeout);
    test(`(proto) ${message}`, async () => await (testFn as any)(fnNames.map(wrapProto)), timeout);
    if (pipeFns.every(xs => typeof xs === 'function')) {
      test(`(pipe) ${message}`, async () => await (testFn as any)(pipeFns.map(wrapPipe)), timeout);
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
