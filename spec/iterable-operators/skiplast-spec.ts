import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.skipLast]);
const { empty } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;

test('Iterable#skipLast empty', (t, [skipLast]) => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#skipLast partial', (t, [skipLast]) => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  t.true(sequenceEqual(r, take(e, 2)));
  t.end();
});
