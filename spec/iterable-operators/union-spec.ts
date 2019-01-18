import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.union]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#union with default comparer', ([union]) => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = union(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 5);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#union with custom comparer', ([union]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = union(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, -3);
  hasNext(it, 5);
  hasNext(it, 4);
  noNext(it);
});
