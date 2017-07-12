import * as Ix from '../Ix';
import * as test from 'tape';
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { skipLast } = Ix.asynciterable;
const { take } = Ix.asynciterable;

test('AsyncIterable#skipLast empty', async t => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  t.true(await sequenceEqual(r, e));
  t.end();
});

test('AsyncIterable#skipLast partial', async t => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  t.true(await sequenceEqual(r, take(e, 2)));
  t.end();
});
