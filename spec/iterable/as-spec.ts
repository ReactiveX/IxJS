import { hasNext, noNext } from '../iterablehelpers';
import { IterableX } from 'ix/iterable';

test('Iterable#as from array/iterable', () => {
  const xs = [1, 2, 3];
  const res = IterableX.asIterable(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#as from empty array/iterable', () => {
  const xs: number[] = [];
  const res = IterableX.asIterable(xs);

  const it = res[Symbol.iterator]();
  noNext(it);
});

test('Iterable#as from array-like', () => {
  const xs = { length: 3 };
  const res = IterableX.asIterable(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, undefined);
  noNext(it);
});

test('Iterable#as from non-iterable', () => {
  const xs = {};
  const res = IterableX.asIterable(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, xs);
  noNext(it);
});
