import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.average]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('Iterable#average empty', async ([average]) => {
  const xs = empty<number>();
  try {
    await average(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('Iterable#average', async ([average]) => {
  const res = await average(of(1, 2, 3));
  expect(res).toBe(2);
});

test('Iterable#average with selector empty', async ([average]) => {
  const xs = empty<number>();
  try {
    await average(xs, async x => x * 2);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('Iterable#average with selector', async ([average]) => {
  const res = await average(of(1, 2, 3), x => x * 2);
  expect(res).toBe(4);
});

test('Iterable#average laws', async ([average]) => {
  const xs = of(1, 2, 3);
  expect(await average(xs)).toBe(await average(xs, x => x));
});
