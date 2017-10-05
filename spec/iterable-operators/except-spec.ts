import * as Ix from '../Ix';
import * as test from 'tape-async';
const { except } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#except with default comparer', t => {
  const xs = [1, 2, 3];
  const ys = [3, 5, 1, 4];
  const res = except(xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#except with custom comparer', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3];
  const ys = [3, 5, -1, 4];
  const res = except(xs, ys, comparer);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});
