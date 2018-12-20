import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.except]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#except with default comparer', ([except]) => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = except(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#except with custom comparer', ([except]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = except(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(it, 2);
  noNext(it);
});
