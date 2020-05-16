import '../iterablehelpers';
import { of, empty, reduce } from 'ix/iterable';

test('Iterable#reduce no seed', () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, { callback: (x, y, i) => x + y + i });
  expect(ys).toBe(20);
});

test('Iterable#reduce no seed empty throws', () => {
  const xs = empty();
  expect(() => reduce<number>(xs, { callback: (x, y, i) => x + y + i })).toThrow();
});

test('Iterable#reduce with seed', () => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(0);
});

test('Iterable#reduce with seed empty', () => {
  const xs = empty();
  const ys = reduce(xs, { callback: (x, y, i) => x - y - i, seed: 20 });
  expect(ys).toBe(20);
});
