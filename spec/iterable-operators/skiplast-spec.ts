import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.skipLast]);
const { empty } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;

test('Iterable#skipLast empty', ([skipLast]) => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  expect(sequenceEqual(r, e)).toBeTruthy();
});

test('Iterable#skipLast partial', ([skipLast]) => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  expect(sequenceEqual(r, take(e, 2))).toBeTruthy();
});
