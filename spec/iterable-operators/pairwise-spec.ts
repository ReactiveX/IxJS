import { hasNext, noNext } from '../iterablehelpers.js';
import { pairwise } from 'ix/iterable/operators/index.js';
import { as, empty, of } from 'ix/iterable/index.js';

test('Iterable#pairwise empty return empty', () => {
  const xs = empty();
  const ys = as(xs).pipe(pairwise());

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#pairwise single returns empty', () => {
  const xs = of(5);
  const ys = as(xs).pipe(pairwise());

  const it = ys[Symbol.iterator]();
  noNext(it);
});

test('Iterable#pairwise behavior', () => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = as(xs).pipe(pairwise());

  const it = ys[Symbol.iterator]();
  hasNext(it, [5, 4]);
  hasNext(it, [4, 3]);
  hasNext(it, [3, 2]);
  hasNext(it, [2, 1]);
  noNext(it);
});
