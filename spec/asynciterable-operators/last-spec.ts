import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.last]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#last empty returns undefined', async ([last]) => {
  const xs = empty<number>();
  const ys = await last(xs);
  expect(ys).toBe(undefined);
});

test('AsyncIterable#last no predicate returns first', async ([last]) => {
  const xs = of(1, 2, 3);
  const ys = await last(xs);
  expect(ys).toBe(3);
});

test('AsyncIterable#last predicate empty returns undefined', async ([last]) => {
  const xs = empty<number>();
  const ys = await last(xs, async () => true);
  expect(ys).toBe(undefined);
});

test('AsyncIterable#last predicate hits returns value', async ([last]) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await last(xs, async x => x % 2 === 0);
  expect(ys).toBe(4);
});

test('AsyncIterable#last predicate misses returns undefined', async ([last]) => {
  const xs = of(1, 3, 5);
  const ys = await last(xs, async x => x % 2 === 0);
  expect(ys).toBe(undefined);
});
