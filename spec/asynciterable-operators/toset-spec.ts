import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toSet]);
const { empty } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#toSet non-empty', async ([toSet]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = from(xs);
  const res = await toSet(ys);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#toSet empty', async ([toSet]) => {
  const xs = empty<number>();
  const res = await toSet(xs);
  expect(res.size).toBe(0);
});

test('AsyncIterable#toSet trims', async ([toSet]) => {
  const xs = from([1, 2, 3, 3, 2, 1]);
  const ys = [1, 2, 3];
  const res = await toSet(xs);
  expect(sequenceEqual(res, ys)).toBeTruthy();
});
