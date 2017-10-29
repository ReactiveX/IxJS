import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.toArray]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#toArray some', (t, [toArray]) => {
  const xs = [42, 25, 39];
  const res = toArray(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#toArray empty', (t, [toArray]) => {
  const res = toArray<number>([]);
  t.equal(res.length, 0);
  t.end();
});
