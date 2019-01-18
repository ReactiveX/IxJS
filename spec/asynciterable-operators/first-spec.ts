import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.first]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#first empty returns undefined', async ([first]) => {
  const xs = empty<number>();
  const ys = await first(xs);
  expect(ys).toBe(undefined);
});

test('AsyncIterable#first no predicate returns first', async ([first]) => {
  const xs = of(1, 2, 3);
  const ys = await first(xs);
  expect(ys).toBe(1);
});

test('AsyncIterable#first predicate empty returns undefined', async ([first]) => {
  const xs = empty<number>();
  const ys = await first(xs, async () => true);
  expect(ys).toBe(undefined);
});

test('AsyncIterable#first predicate hits returns value', async ([first]) => {
  const xs = of(1, 2, 3);
  const ys = await first(xs, async x => x % 2 === 0);
  expect(ys).toBe(2);
});

test('AsyncIterable#first predicate misses returns undefined', async ([first]) => {
  const xs = of(1, 3, 5);
  const ys = await first(xs, async x => x % 2 === 0);
  expect(ys).toBe(undefined);
});
