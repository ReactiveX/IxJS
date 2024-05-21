import '../asynciterablehelpers.js';
import { empty, of, reduce } from 'ix/asynciterable/index.js';

test('Iterable#reduce no seed', async () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, { callback: (x, y, i) => x + y + i });
  expect(ys).toBe(20);
});

test('Iterable#reduce no seed empty throws', async () => {
  const xs = empty();
  await expect(
    reduce<number>(xs, { callback: (x, y, i) => x + y + i })
  ).rejects.toThrow();
});

test('Iterable#reduce with seed', async () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(0);
});

test('Iterable#reduce with seed empty', async () => {
  const xs = empty();
  const ys = await reduce(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(20);
});
