import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.scanRight]);
const { range } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scanRight no seed', async (t, [scanRight]) => {
  const res = scanRight(range(0, 5), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 10);
  await hasNext(t, it, 14);
  await hasNext(t, it, 16);
  await hasNext(t, it, 16);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#scanRight with seed', async (t, [scanRight]) => {
  const res = scanRight(range(0, 5), async (n, x, i) => n - x - i, 20);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 12);
  await hasNext(t, it, 6);
  await hasNext(t, it, 2);
  await hasNext(t, it, 0);
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});
