import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.startWith]);
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#startWith adds to beginning', async ([startWith]) => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  expect(await sequenceEqual(r, range(0, 6))).toBeTruthy();
});

test('AsyncIterable#startWith adds without causing effects', async ([startWith]) => {
  let oops = false;
  const e = tap(range(1, 5), {
    next: async () => {
      oops = true;
    }
  });
  await toArray(take(startWith(e, 0), 1));
  expect(oops).toBeFalsy();
});
