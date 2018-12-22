import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.doWhile]);
const { defer } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#doWhile some', ([doWhile]) => {
  let x = 5;
  const res = toArray(doWhile(defer(() => tap([x], { next: () => x-- })), () => x > 0));

  expect(sequenceEqual(res, [5, 4, 3, 2, 1])).toBeTruthy();
});

test('Iterable#doWhile one', ([doWhile]) => {
  let x = 0;
  const res = toArray(doWhile(defer(() => tap([x], { next: () => x-- })), () => x > 0));

  expect(sequenceEqual(res, [0])).toBeTruthy();
});
