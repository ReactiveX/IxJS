import { jest } from '@jest/globals';
import '../asynciterablehelpers.js';
import {
  first,
  from,
  of,
  range,
  sequenceEqual,
  single,
  throwError,
} from 'ix/asynciterable/index.js';
import { catchError } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#catchError error catches', async () => {
  const err = new Error();
  const res = await single(
    throwError(err).pipe(
      catchError(async (e: Error) => {
        expect(e).toEqual(err);
        return of(42);
      })
    )
  );
  expect(42).toBe(res);
});

test('AsyncIterable#catchError no error misses', async () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError(async (_: Error) => of(42)));
  await expect(sequenceEqual(res, xs)).resolves.toBeTruthy();
});

test('AsyncIterable#catchError source and handler types are composed', async () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError(async (_: Error) => of('foo')));
  await expect(sequenceEqual(res, xs)).resolves.toBeTruthy();
});

test('AsyncIterable#catchError calls return() on source iterator when stopped early', async () => {
  const xs = range(0, 10)[Symbol.asyncIterator]();
  const returnSpy = jest.spyOn(xs, 'return');

  const res = from(xs).pipe(catchError((_: Error) => from([])));

  await first(res);

  expect(returnSpy).toHaveBeenCalled();
});
