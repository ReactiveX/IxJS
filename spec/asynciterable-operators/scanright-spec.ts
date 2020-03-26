import { hasNext, noNext } from '../asynciterablehelpers';
import { scanRight } from 'ix/asynciterable/operators';
import { range } from 'ix/asynciterable';

test('AsyncIterable#scanRight no seed', async () => {
  const res = range(0, 5).pipe(scanRight({ callback: async (n, x, i) => n + x + i }));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 10);
  await hasNext(it, 14);
  await hasNext(it, 16);
  await hasNext(it, 16);
  await noNext(it);
});

test('AsyncIterable#scanRight with seed', async () => {
  const res = range(0, 5).pipe(scanRight({ callback: async (n, x, i) => n - x - i, seed: 20 }));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 12);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await hasNext(it, 0);
  await noNext(it);
});
