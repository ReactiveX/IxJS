import '../asynciterablehelpers';
import { empty, first, of } from 'ix/asynciterable';

test('AsyncIterable#first empty returns undefined', async () => {
  const xs = empty();
  const ys = await first(xs);
  expect(ys).toBe(undefined);
});

test('AsyncIterable#first no predicate returns first', async () => {
  const xs = of(1, 2, 3);
  const ys = await first(xs);
  expect(ys).toBe(1);
});

test('AsyncIterable#first predicate empty returns undefined', async () => {
  const xs = empty();
  const ys = await first(xs, { predicate: async () => true });
  expect(ys).toBe(undefined);
});

test('AsyncIterable#first predicate hits returns value', async () => {
  const xs = of(1, 2, 3);
  const ys = await first(xs, { predicate: async (x) => x % 2 === 0 });
  expect(ys).toBe(2);
});

test('AsyncIterable#first predicate misses returns undefined', async () => {
  const xs = of(1, 3, 5);
  const ys = await first(xs, { predicate: async (x) => x % 2 === 0 });
  expect(ys).toBe(undefined);
});
