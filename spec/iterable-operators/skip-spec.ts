import { jest } from '@jest/globals';
import { hasNext, noNext } from '../iterablehelpers.js';
import { as, first, range, throwError } from 'ix/iterable/index.js';
import { skip } from 'ix/iterable/operators/index.js';

test('Iterable#skip skips some', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skip(2));

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip skips more than count', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skip(10));

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#skip none', () => {
  const xs = [1, 2, 3, 4];
  const ys = as(xs).pipe(skip(0));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip throws', () => {
  const xs = throwError(new Error());
  const ys = as(xs).pipe(skip(2));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#skip calls return() on source iterator when stopped early', () => {
  const xs = range(0, 10)[Symbol.iterator]();
  const returnSpy = jest.spyOn(xs, 'return');

  const res = as(xs).pipe(skip(2));

  first(res);

  expect(returnSpy).toHaveBeenCalled();
});
