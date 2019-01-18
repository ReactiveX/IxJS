import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.elementAt]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#elementAt empty returns undefined', async ([elementAt]) => {
  const xs = empty<number>();
  const res = await elementAt<number>(xs, 0);
  expect(res).toBe(undefined);
});

test('AsyncIterable#elementAt single value first index', async ([elementAt]) => {
  const xs = of(42);
  const res = await elementAt(xs, 0);
  expect(res).toBe(42);
});

test('AsyncIterable#elementAt single value invalid index', async ([elementAt]) => {
  const xs = of(42);
  const res = await elementAt(xs, 1);
  expect(res).toBe(undefined);
});

test('AsyncIterable#elementAt multiple values valid index', async ([elementAt]) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 1);
  expect(res).toBe(42);
});

test('AsyncIterable#elementAt multiple values invalid index', async ([elementAt]) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 7);
  expect(res).toBe(undefined);
});
