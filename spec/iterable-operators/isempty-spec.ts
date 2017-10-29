import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.isEmpty]);
const { empty } = Ix.iterable;

test('Iterable#isEmpty empty', (t, [isEmpty]) => {
  t.true(isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', (t, [isEmpty]) => {
  t.false(isEmpty([1]));
  t.end();
});
