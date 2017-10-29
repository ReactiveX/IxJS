import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.isEmpty]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('Iterable#isEmpty empty', async (t, [isEmpty]) => {
  t.true(await isEmpty(empty<number>()));
  t.end();
});

test('Iterable#isEmpty not-empty', async (t, [isEmpty]) => {
  t.false(await isEmpty(of(1)));
  t.end();
});
