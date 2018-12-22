import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.endWith]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#endWith adds to end', ([endWith]) => {
  const e = range(0, 5);
  const r = endWith(e, 5, 6);
  expect(sequenceEqual(r, range(0, 7))).toBeTruthy();
});
