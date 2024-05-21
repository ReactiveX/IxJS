import '../asynciterablehelpers.js';
import { empty, of, single } from 'ix/asynciterable/index.js';

test('AsyncIterable#single no predicate empty returns undefined', async () => {
  const xs = empty();
  const res = await single(xs);
  expect(res).toBeUndefined();
});

test('AsyncIterable#single with predicate empty returns undefined', async () => {
  const xs = empty();
  const res = await single(xs, { predicate: async () => true });
  expect(res).toBeUndefined();
});

test('AsyncIterable#single predicate miss', async () => {
  const xs = of(42);
  const res = await single(xs, { predicate: async (x) => x % 2 !== 0 });
  expect(res).toBeUndefined();
});

test('AsyncIterable#single no predicate hit', async () => {
  const xs = of(42);
  const res = await single(xs);
  expect(res).toBe(42);
});

test('AsyncIterable#single predicate hit', async () => {
  const xs = of(42);
  const res = await single(xs, { predicate: async (x) => x % 2 === 0 });
  expect(res).toBe(42);
});

test('AsyncIterable#single no predicate multiple throws error', async () => {
  const xs = of(42, 45, 90);
  await expect(single(xs)).rejects.toThrow();
});

test('AsyncIterable#single with predicate multiple throws error', async () => {
  const xs = of(42, 45, 90);
  await expect(single(xs, { predicate: async (x) => x % 2 === 0 })).rejects.toThrow();
});
