import * as Ix from '../Ix';
import * as test from 'tape';
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { skip } = Ix.asynciterable;
const { takeLast } = Ix.asynciterable;

test('AsyncIterable#takeLast none', async t => {
  const res = takeLast(range(1, 5), 0);
  t.true(await sequenceEqual(res, empty<number>()));
  t.end();
});

test('AsyncIterable#takeLast empty', async t => {
  const res = takeLast(empty<number>(), 1);
  t.true(await sequenceEqual(res, empty<number>()));
  t.end();
});

test('AsyncIterable#takeLast has all', async t => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  t.true(await sequenceEqual(r, e));
  t.end();
});

test('AsyncIterable#takeLast has part', async t => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  t.true(await sequenceEqual(r, skip(e, 2)));
  t.end();
});
