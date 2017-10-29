import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.intersect]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#union with default comparer', (t, [intersect]) => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = intersect(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 3);
  noNext(t, it);
  t.end();
});

test('Iterable#union with custom comparer', (t, [intersect]) => {
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
