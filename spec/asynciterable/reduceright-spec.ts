import '../asynciterablehelpers';
import { empty, of, reduceRight } from 'ix/asynciterable';

test('AsyncIterable#reduceRight no seed', async () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, { callback: (x, y, i) => x + y + i });
  expect(ys).toBe(16);
});

test('AsyncIterable#reduceRight no seed empty throws', async () => {
  const xs = empty();
  await expect(
    reduceRight<number>(xs, { callback: (x, y, i) => x + y + i })
  ).rejects.toThrow();
});

test('AsyncIterable#reduceRight with seed', async () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(0);
});

test('AsyncIterable#reduceRight with seed empty', async () => {
  const xs = empty();
  const ys = await reduceRight(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(20);
});
