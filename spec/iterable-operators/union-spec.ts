import * as Ix from '../Ix';
import * as test from 'tape';
const { union } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#union with default comparer', t => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = union(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 5);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#union with custom comparer', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = union(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, -3);
  hasNext(t, it, 5);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});
