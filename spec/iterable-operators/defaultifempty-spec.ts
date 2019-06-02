import { hasNext, noNext } from '../iterablehelpers';
import { empty, throwError } from 'ix/iterable';
import { defaultIfEmpty } from 'ix/iterable/operators';

test('Iterable#defaultIfEmpty with empty', () => {
  const xs = empty<number>();
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.iterator]();
  hasNext(it, 0);
  noNext(it);
});

test('Iterable#defaultIfEmpty with no empty', () => {
  const xs = [42];
  const ys = defaultIfEmpty(0)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 42);
  noNext(it);
});

test('Iterable#defaultIfEmpty throws', () => {
  const xs = throwError<number>(new Error());
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
