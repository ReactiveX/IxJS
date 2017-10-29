import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.takeLast]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skip } = Ix.iterable;

test('Iterable#takeLast none', (t, [takeLast]) => {
  const res = takeLast(range(1, 5), 0);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast empty', (t, [takeLast]) => {
  const res = takeLast([], 1);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast has all', (t, [takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#takeLast has part', (t, [takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  t.true(sequenceEqual(r, skip(e, 2)));
  t.end();
});
