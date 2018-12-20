import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.isEmpty]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('Iterable#isEmpty empty', async ([isEmpty]) => {
  expect(await isEmpty(empty<number>())).toBeTruthy();
});

test('Iterable#isEmpty not-empty', async ([isEmpty]) => {
  expect(await isEmpty(of(1))).toBeFalsy();
});
