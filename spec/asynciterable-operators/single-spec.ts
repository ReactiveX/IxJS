import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.single]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#single no predicate empty returns undefined', async ([single]) => {
  const xs = empty<number>();
  const res = await single(xs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#single with predicate empty returns undefined', async ([single]) => {
  const xs = empty<number>();
  const res = await single(xs, async () => true);
  expect(res).toBe(undefined);
});

test('AsyncIterable#single predicate miss', async ([single]) => {
  const xs = of(42);
  const res = await single(xs, x => x % 2 !== 0);
  expect(res).toBe(undefined);
});

test('AsyncIterable#single no predicate hit', async ([single]) => {
  const xs = of(42);
  const res = await single(xs);
  expect(res).toBe(42);
});

test('AsyncIterable#single predicate hit', async ([single]) => {
  const xs = of(42);
  const res = await single(xs, x => x % 2 === 0);
  expect(res).toBe(42);
});

test('AsyncIterable#single no predicate multiple throws error', async ([single]) => {
  const xs = of(42, 45, 90);
  try {
    await single(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#single with predicate multiple throws error', async ([single]) => {
  const xs = of(42, 45, 90);
  try {
    await single(xs, async x => x % 2 === 0);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
