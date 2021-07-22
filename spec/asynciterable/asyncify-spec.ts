import { hasNext, noNext } from '../asynciterablehelpers';
import { asyncify } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#asyncify single argument', async () => {
  const callbackFn = (a: number, b: number, cb: (...xs: any[]) => any) => {
    cb(a + b);
  };

  const asyncFn = asyncify(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#asyncify multiple arguments', async () => {
  const callbackFn = (a: number, b: number, cb: (...xs: any[]) => any) => {
    cb(a, b);
  };

  const asyncFn = asyncify(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  const { value, done } = await it.next();
  expect(sequenceEqual(value as number[], [1, 2])).toBeTruthy();
  expect(done).toBeFalsy();
  await noNext(it);
});
