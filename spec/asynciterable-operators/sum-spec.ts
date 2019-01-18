import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.sum]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#sum laws', async ([sum]) => {
  const xs = of(1, 2, 3);
  expect(await sum(xs)).toBe(await sum(xs, async x => x));
});

test('AsyncIterable#sum no selector empty', async ([sum]) => {
  const xs = empty<number>();
  const res = await sum(xs);
  expect(res).toBe(0);
});

test('AsyncIterable#sum no selector', async ([sum]) => {
  const xs = of(1, 2, 3);
  const res = await sum(xs);
  expect(res).toBe(6);
});

test('AsyncIterable#sum with selector empty', async ([sum]) => {
  const xs = empty<number>();
  const res = await sum(xs, async x => x * 2);
  expect(res).toBe(0);
});

test('AsyncIterable#sum with selector', async ([sum]) => {
  const xs = of(1, 2, 3);
  const res = await sum(xs, async x => x * 2);
  expect(res).toBe(12);
});
