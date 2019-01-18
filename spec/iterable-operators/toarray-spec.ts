import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.toArray]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#toArray some', ([toArray]) => {
  const xs = [42, 25, 39];
  const res = toArray(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#toArray empty', ([toArray]) => {
  const res = toArray<number>([]);
  expect(res.length).toBe(0);
});
