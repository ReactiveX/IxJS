import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.scan]);
const { range } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scan no seed', async (t, [scan]) => {
  const res = scan(range(0, 5), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 6);
  await hasNext(t, it, 12);
  await hasNext(t, it, 20);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#scan with seed', async (t, [scan]) => {
  const res = scan(range(0, 5), async (n, x, i) => n - x - i, 20);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 20);
  await hasNext(t, it, 18);
  await hasNext(t, it, 14);
  await hasNext(t, it, 8);
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});
