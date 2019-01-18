import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toMap]);
const { of } = Ix.AsyncIterable;

test('AsyncIterable#toMap stores values', async ([toMap]) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2);
  expect(res.get(0)).toBe(4);
  expect(res.get(1)).toBe(1);
});

test('AsyncIterable#toMap overwrites duplicates', async ([toMap]) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2);
  expect(res.get(0)).toBe(2);
  expect(res.get(1)).toBe(1);
});

test('AsyncIterable#toMap with element selector', async ([toMap]) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  expect(res.get(0)).toBe(5);
  expect(res.get(1)).toBe(2);
});

test('AsyncIterable#toMap with element selector overwrites duplicates', async ([toMap]) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  expect(res.get(0)).toBe(3);
  expect(res.get(1)).toBe(2);
});
