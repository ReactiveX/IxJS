import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.every]);

test('Iterable#every some true', ([every]) => {
  const res = every([1, 2, 3, 4], x => x % 2 === 0);
  expect(res).toBeFalsy();
});

test('Iterable#very all true', ([every]) => {
  const res = every([2, 8, 4, 6], x => x % 2 === 0);
  expect(res).toBeTruthy();
});
