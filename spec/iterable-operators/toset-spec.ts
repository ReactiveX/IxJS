import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.toSet]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#toSet non-empty', (t, [toSet]) => {
  const xs = [1, 2, 3, 4, 5];
  const res = toSet(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#toSet empty', (t, [toSet]) => {
  const res = toSet<number>([]);
  t.equal(res.size, 0);
  t.end();
});

test('Iterable#toSet trims', (t, [toSet]) => {
  const xs = [1, 2, 3, 3, 2, 1];
  const ys = [1, 2, 3];
  const res = toSet(xs);
  t.true(sequenceEqual(res, ys));
  t.end();
});
