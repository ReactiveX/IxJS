import { catchError } from 'ix/iterable/operators';
import { of, range, sequenceEqual, single, throwError } from 'ix/iterable';

test('Iterable#catchWith error catches', () => {
  const err = new Error();
  const res = single(
    throwError(err).pipe(
      catchError(e => {
        expect(err).toEqual(e);
        return of(42);
      })
    )
  );
  expect(42).toBe(res);
});

test('Iterable#catchWith no error misses', () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError(_ => of(42)));
  expect(sequenceEqual(res, xs)).toBeTruthy();
});
