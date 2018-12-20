import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.isEmpty]);
const { empty } = Ix.iterable;

test('Iterable#isEmpty empty', ([isEmpty]) => {
  expect(isEmpty(empty<number>())).toBeTruthy();
});

test('Iterable#isEmpty not-empty', ([isEmpty]) => {
  expect(isEmpty([1])).toBeFalsy();
});
