import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.takeLast]);
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { skip } = Ix.asynciterable;

test('AsyncIterable#takeLast none', async ([takeLast]) => {
  const res = takeLast(range(1, 5), 0);
  expect(await sequenceEqual(res, empty<number>())).toBeTruthy();
});

test('AsyncIterable#takeLast empty', async ([takeLast]) => {
  const res = takeLast(empty<number>(), 1);
  expect(await sequenceEqual(res, empty<number>())).toBeTruthy();
});

test('AsyncIterable#takeLast has all', async ([takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  expect(await sequenceEqual(r, e)).toBeTruthy();
});

test('AsyncIterable#takeLast has part', async ([takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  expect(await sequenceEqual(r, skip(e, 2))).toBeTruthy();
});
