import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.min]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncItearble#min laws', async ([min]) => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await min(xs)).toBe(await min(xs, x => x));
});

test('AsyncIterable#min empty throws', async ([min]) => {
  const xs = empty<number>();
  try {
    await min(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#min', async ([min]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs);
  expect(res).toBe(1);
});

test('AsyncIterable#min with selector empty throws', async ([min]) => {
  const xs = empty<number>();
  try {
    await min(xs, async x => x * 2);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#min with selector', async ([min]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs, async x => x * 2);
  expect(res).toBe(2);
});
