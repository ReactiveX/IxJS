import { hasNext } from '../iterablehelpers';
import { catchError, concat, range, sequenceEqual, throwError } from 'ix/iterable';

test('Iterable.catchError with no errors', () => {
  const res = catchError(range(0, 5), range(5, 5));
  expect(sequenceEqual(res, range(0, 5))).toBeTruthy();
});

test('Iterable.catchError with concat error', () => {
  const res = catchError(concat(range(0, 5), throwError(new Error())), range(5, 5));

  expect(sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('Iterable.catchError still throws', () => {
  const e1 = new Error();
  const er1 = throwError(e1);

  const e2 = new Error();
  const er2 = throwError(e2);

  const e3 = new Error();
  const er3 = throwError(e3);

  const res = catchError(concat(range(0, 2), er1), concat(range(2, 2), er2), er3);

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  try {
    it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
