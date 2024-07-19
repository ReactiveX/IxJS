import { jest } from '@jest/globals';
import { skip } from 'ix/iterable/operators.js';
import { hasNext } from '../iterablehelpers.js';
import {
  from,
  catchError,
  concat,
  range,
  sequenceEqual,
  throwError,
  first,
} from 'ix/iterable/index.js';

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
  expect(() => it.next()).toThrow();
});

test('Iterable.catchError calls return() on source iterator when stopped early', () => {
  const e1 = new Error();
  const er1 = throwError(e1);

  const xs2 = range(2, 2)[Symbol.iterator]();
  const returnSpy = jest.spyOn(xs2, 'return');

  const res = catchError(concat(range(0, 2), er1), from(xs2)).pipe(skip(2));

  first(res);

  expect(returnSpy).toHaveBeenCalled();
});
