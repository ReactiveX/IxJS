export async function hasNext<T>(t: any, source: AsyncIterator<T>, expected: T) {
  const { done, value } = await source.next();
  t.false(done, 'should not be done');
  t.deepEqual(value, expected);
}

export async function noNext<T>(t: any, source: AsyncIterator<T>) {
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

import * as Ix from './Ix';
import * as test from 'tape-async';

const operatorNamesByImpl = Object.keys(Ix.asynciterable).reduce(
  (map, name) => map.set((Ix.asynciterable as any)[name], name),
  new Map<Function, string>()
);

export function testOperator<Op extends Function>(operator: Op) {
  const name = operatorNamesByImpl.get(operator)!;
  const pipeFn = (Ix.asynciterablePipe as any)[name];
  const protoFn = (Ix.AsyncIterable.prototype as any)[name];
  return async function runOperatorTest(
    message: string,
    testFn: (t: test.Test, op: Op) => any | Promise<any>
  ) {
    test(`(fp) ${message}`, async t => {
      return await testFn(t, operator);
    });
    test(`(pipe) ${message}`, async t => {
      return await testFn(t, (((source: any, ...args: any[]) =>
        source.pipe(pipeFn(...args))) as any) as Op);
    });
    test(`(proto) ${message}`, async t => {
      return await testFn(t, (((source: any, ...args: any[]) =>
        protoFn.apply(source, args)) as any) as Op);
    });
  };
}
