import { hasNext, noNext } from '../asynciterablehelpers';
import { asyncifyErrback } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#asyncifyErrback single argument', async () => {
  const callbackFn = (a: number, b: number, cb: (err: Error | null, ...rest: any[]) => void) => {
    cb(null, a + b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#asyncifyErrback with error', async () => {
  const error = new Error();
  const callbackFn = (a: number, b: number, cb: (err: Error | null, ...rest: any[]) => void) => {
    cb(error, a + b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(error);
});

test('AsyncIterable#asyncifyErrback multiple arguments', async () => {
  const callbackFn = (a: number, b: number, cb: (err: Error | null, ...rest: any[]) => void) => {
    cb(null, a, b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  const { value, done } = await it.next();
  expect(sequenceEqual(value as number[], [1, 2])).toBeTruthy();
  expect(done).toBeFalsy();
  await noNext(it);
});
