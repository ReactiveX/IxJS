import '../asynciterablehelpers';
import { of, range, sequenceEqual, single, throwError } from 'ix/asynciterable';
import { catchError } from 'ix/asynciterable/operators';

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
  expect(sequenceEqual(res, xs)).resolves.toBeTruthy();
});

test('AsyncIterable#catchError source and handler types are composed', async () => {
  const xs = range(0, 10);
  const res = xs.pipe(catchError(async (_: Error) => of('foo')));
  expect(sequenceEqual(res, xs)).resolves.toBeTruthy();
});
