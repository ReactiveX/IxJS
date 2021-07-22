import '../asynciterablehelpers';
import { of, empty, last } from 'ix/asynciterable';

test('AsyncIterable#last empty returns undefined', async () => {
  const xs = empty();
  const ys = await last(xs);
  expect(ys).toBeUndefined();
});

test('AsyncIterable#last no predicate returns first', async () => {
  const xs = of(1, 2, 3);
  const ys = await last(xs);
  expect(ys).toBe(3);
});

test('AsyncIterable#last predicate empty returns undefined', async () => {
  const xs = empty();
  const ys = await last(xs, { predicate: async () => true });
  expect(ys).toBeUndefined();
});

test('AsyncIterable#last predicate hits returns value', async () => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await last(xs, { predicate: async (x) => x % 2 === 0 });
  expect(ys).toBe(4);
});

test('AsyncIterable#last predicate misses returns undefined', async () => {
  const xs = of(1, 3, 5);
  const ys = await last(xs, { predicate: async (x) => x % 2 === 0 });
  expect(ys).toBeUndefined();
});
