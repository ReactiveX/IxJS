import { hasNext, noNext } from '../iterablehelpers';
import { from, throwError } from 'ix/iterable';
import { skip } from 'ix/iterable/operators';

test('Iterable#skip skips some', () => {
  const xs = [1, 2, 3, 4];
  const ys = from(xs).pipe(skip(2));

  const it = ys[Symbol.iterator]();
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip skips more than count', () => {
  const xs = [1, 2, 3, 4];
  const ys = from(xs).pipe(skip(10));

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#skip none', () => {
  const xs = [1, 2, 3, 4];
  const ys = from(xs).pipe(skip(0));

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#skip throws', () => {
  const xs = throwError<number>(new Error());
  const ys = from(xs).pipe(skip(2));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
