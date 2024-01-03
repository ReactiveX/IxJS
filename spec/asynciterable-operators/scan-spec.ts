import { hasNext, noNext } from '../asynciterablehelpers.js';
import { scan } from 'ix/asynciterable/operators/index.js';
import { of, range } from 'ix/asynciterable/index.js';

test('AsyncIterable#scan no seed', async () => {
  const res = range(0, 5).pipe(scan({ callback: async (n, x, i) => n + x + i }));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 6);
  await hasNext(it, 12);
  await hasNext(it, 20);
  await noNext(it);
});

test('AsyncIterable#scan with seed', async () => {
  const res = range(0, 5).pipe(scan({ callback: async (n, x, i) => n - x - i, seed: 20 }));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 20);
  await hasNext(it, 18);
  await hasNext(it, 14);
  await hasNext(it, 8);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#scan no seed yields the value of single-element sources', async () => {
  const res = of(0).pipe(scan({ callback: async (n, x, i) => n + x + i }));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await noNext(it);
});
