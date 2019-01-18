import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.skipLast]);
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { take } = Ix.asynciterable;

test('AsyncIterable#skipLast empty', async ([skipLast]) => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  expect(await sequenceEqual(r, e)).toBeTruthy();
});

test('AsyncIterable#skipLast partial', async ([skipLast]) => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  expect(await sequenceEqual(r, take(e, 2))).toBeTruthy();
});
