import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.max]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncItearble#max laws', async ([max]) => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await max(xs)).toBe(await max(xs, async x => x));
});

test('AsyncIterable#max empty throws', async ([max]) => {
  const xs = empty<number>();
  try {
    await max(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#max', async ([max]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs);
  expect(res).toBe(5);
});

test('AsyncIterable#max with selector empty throws', async ([max]) => {
  const xs = empty<number>();
  try {
    await max(xs, async x => x * 2);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#max with selector', async ([max]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs, async x => x * 2);
  expect(res).toBe(10);
});
