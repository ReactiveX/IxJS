import { hasNext, noNext } from '../iterablehelpers.js';
import { as } from 'ix/iterable/index.js';
import { intersect } from 'ix/iterable/operators/index.js';

test('Iterable#union with default comparer', () => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = as(xs).pipe(intersect(ys));

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#union with custom comparer', () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = as(xs).pipe(intersect(ys, comparer));

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, -3);
  noNext(it);
});
