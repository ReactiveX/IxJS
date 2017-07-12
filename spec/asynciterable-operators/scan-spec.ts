import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.asynciterable;
const { scan } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scan no seed', async t => {
  const res = scan(range(0, 5), async (n, x, i) => n + x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 6);
  await hasNext(t, it, 12);
  await hasNext(t, it, 20);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#scan with seed', async t => {
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
