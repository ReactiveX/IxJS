import { hasNext, noNext } from '../iterablehelpers';
import { take } from 'ix/iterable/operators';
import { throwError } from 'ix/iterable';

test('Iterable#take zero or less takes nothing', () => {
  const xs = [1, 2, 3, 4];
  const ys = take(-2)(xs);

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#take less than count', () => {
  const xs = [1, 2, 3, 4];
  const ys = take(2)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#take more than count', () => {
  const xs = [1, 2, 3, 4];
  const ys = take(10)(xs);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#take throws with error', () => {
  const xs = throwError(new Error());
  const ys = take(2)(xs);

  const it = ys[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
