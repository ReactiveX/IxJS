import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.iterable;
const { scanRight } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#scanRight no seed', t => {
  const res = scanRight(range(0, 5), (n, x, i) => n + x + i);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 10);
  hasNext(t, it, 14);
  hasNext(t, it, 16);
  hasNext(t, it, 16);
  noNext(t, it);
  t.end();
});

test('Iterable#scanRight with seed', t => {
  const res = scanRight(range(0, 5), (n, x, i) => n - x - i, 20);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 12);
  hasNext(t, it, 6);
  hasNext(t, it, 2);
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});
