import * as Ix from '../Ix';
import * as test from 'tape';
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skip } = Ix.iterable;
const { takeLast } = Ix.iterable;

test('Iterable#takeLast none', t => {
  const res = takeLast(range(1, 5), 0);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast empty', t => {
  const res = takeLast([], 1);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast has all', t => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#takeLast has part', t => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  t.true(sequenceEqual(r, skip(e, 2)));
  t.end();
});
