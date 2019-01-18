import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.toSet]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#toSet non-empty', ([toSet]) => {
  const xs = [1, 2, 3, 4, 5];
  const res = toSet(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#toSet empty', ([toSet]) => {
  const res = toSet<number>([]);
  expect(res.size).toBe(0);
});

test('Iterable#toSet trims', ([toSet]) => {
  const xs = [1, 2, 3, 3, 2, 1];
  const ys = [1, 2, 3];
  const res = toSet(xs);
  expect(sequenceEqual(res, ys)).toBeTruthy();
});
