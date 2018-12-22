import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.startWith]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#startWith adds to beginning', ([startWith]) => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  expect(sequenceEqual(r, range(0, 6))).toBeTruthy();
});

test('Iterable#startWith adds without causing effects', ([startWith]) => {
  let oops = false;
  const e = tap(range(1, 5), { next: () => (oops = true) });
  toArray(take(startWith(e, 0), 1));
  expect(oops).toBeFalsy();
});
