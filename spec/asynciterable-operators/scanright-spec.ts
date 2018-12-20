import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.scanRight]);
const { range } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scanRight no seed', async ([scanRight]) => {
  const res = scanRight(range(0, 5), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 10);
  await hasNext(it, 14);
  await hasNext(it, 16);
  await hasNext(it, 16);
  await noNext(it);
});

test('AsyncIterable#scanRight with seed', async ([scanRight]) => {
  const res = scanRight(range(0, 5), async (n, x, i) => n - x - i, 20);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 12);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await hasNext(it, 0);
  await noNext(it);
});
