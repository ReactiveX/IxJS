import '../iterablehelpers';
import { of, range, sequenceEqual, single, throwError } from 'ix/iterable/index.js';
import { catchError } from 'ix/iterable/operators/index.js';

test('Iterable#catchError error catches', () => {
  const err = new Error();
  const res = single(
    throwError(err).pipe(
      catchError((e: Error) => {
        expect(e).toEqual(err);
        return of(42);
      })
    )
  );
  expect(42).toBe(res);
});

test('Iterable#catchError no error misses', () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError((_: Error) => of(42)));
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#catchError source and handler types are composed', () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError((_: Error) => of('foo')));
  expect(sequenceEqual(res, xs)).toBeTruthy();
});
