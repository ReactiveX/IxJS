import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.takeLast]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skip } = Ix.iterable;

test('Iterable#takeLast none', ([takeLast]) => {
  const res = takeLast(range(1, 5), 0);
  expect(sequenceEqual(res, [])).toBeTruthy();
});

test('Iterable#takeLast empty', ([takeLast]) => {
  const res = takeLast([], 1);
  expect(sequenceEqual(res, [])).toBeTruthy();
});

test('Iterable#takeLast has all', ([takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  expect(sequenceEqual(r, e)).toBeTruthy();
});

test('Iterable#takeLast has part', ([takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  expect(sequenceEqual(r, skip(e, 2))).toBeTruthy();
});
