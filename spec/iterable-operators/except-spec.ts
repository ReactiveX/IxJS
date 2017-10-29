import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.except]);
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#except with default comparer', (t, [except]) => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = except(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#except with custom comparer', (t, [except]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = except(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});
