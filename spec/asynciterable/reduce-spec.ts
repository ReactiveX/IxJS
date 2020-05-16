import '../asynciterablehelpers';
import { empty, of, reduce } from 'ix/asynciterable';

test('Iterable#reduce no seed', async () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, { callback: (x, y, i) => x + y + i });
  expect(ys).toBe(20);
});

test('Iterable#reduce no seed empty throws', async () => {
  const xs = empty();
  try {
    await reduce<number>(xs, { callback: (x, y, i) => x + y + i });
  } catch (e) {
    expect(e !== null).toBeTruthy();
  }
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
