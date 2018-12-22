import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toArray]);
const { empty } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#toArray some', async ([toArray]) => {
  const xs = [42, 25, 39];
  const ys = from(xs);
  const res = await toArray(ys);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#toArray empty', async ([toArray]) => {
  const xs = empty<number>();
  const res = await toArray(xs);
  expect(res.length).toBe(0);
});
