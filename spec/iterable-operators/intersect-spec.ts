import * as Ix from '../Ix';
import * as test from 'tape-async';
const { intersect } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#union with default comparer', t => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = intersect(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 3);
  noNext(t, it);
  t.end();
});

test('Iterable#union with custom comparer', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = intersect(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, -3);
  noNext(t, it);
  t.end();
});
