import { hasNext } from '../iterablehelpers';
import { concat, range, sequenceEqual, throwError } from 'ix/iterable';

import { catchError } from 'ix/iterable/operators';

test('Iterable#catch with no errors', () => {
  const src = range(0, 5);
  const res = src.pipe(catchError(() => range(5, 5)));
  expect(sequenceEqual(res, range(0, 5))).toBeTruthy();
});

test('Iterable#catch with concat error', () => {
  const src = concat(range(0, 5), throwError(new Error()));
  const res = src.pipe(catchError(() => range(5, 5)));

  expect(sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('Iterable#catch still throws', () => {
  const e1 = new Error();
  const er1 = throwError(e1);

  const e2 = new Error();
  const er2 = throwError(e2);

  const e3 = new Error();
  const er3 = throwError(e3);

  const res = concat(range(0, 2), er1)
    .pipe(catchError(() => concat(range(2, 2), er2)))
    .pipe(catchError(() => er3));

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  expect(() => it.next()).toThrow();
});
