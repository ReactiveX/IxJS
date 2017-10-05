import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skipLast } = Ix.iterable;
const { take } = Ix.iterable;

test('Iterable#skipLast empty', t => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#skipLast partial', t => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  t.true(sequenceEqual(r, take(e, 2)));
  t.end();
});
