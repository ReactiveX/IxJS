import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.scanRight]);
const { range } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#scanRight no seed', ([scanRight]) => {
  const res = scanRight(range(0, 5), (n, x, i) => n + x + i);

  const it = res[Symbol.iterator]();
  hasNext(it, 10);
  hasNext(it, 14);
  hasNext(it, 16);
  hasNext(it, 16);
  noNext(it);
});

test('Iterable#scanRight with seed', ([scanRight]) => {
  const res = scanRight(range(0, 5), (n, x, i) => n - x - i, 20);

  const it = res[Symbol.iterator]();
  hasNext(it, 12);
  hasNext(it, 6);
  hasNext(it, 2);
  hasNext(it, 0);
  hasNext(it, 0);
  noNext(it);
});
