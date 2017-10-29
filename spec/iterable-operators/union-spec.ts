import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.union]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#union with default comparer', (t, [union]) => {
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

test('Iterable#union with custom comparer', (t, [union]) => {
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
