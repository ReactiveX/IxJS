import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.takeLast]);
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { skip } = Ix.asynciterable;

test('AsyncIterable#takeLast none', async (t, [takeLast]) => {
  const res = takeLast(range(1, 5), 0);
  t.true(await sequenceEqual(res, empty<number>()));
  t.end();
});

test('AsyncIterable#takeLast empty', async (t, [takeLast]) => {
  const res = takeLast(empty<number>(), 1);
  t.true(await sequenceEqual(res, empty<number>()));
  t.end();
});

test('AsyncIterable#takeLast has all', async (t, [takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  t.true(await sequenceEqual(r, e));
  t.end();
});

test('AsyncIterable#takeLast has part', async (t, [takeLast]) => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  t.true(await sequenceEqual(r, skip(e, 2)));
  t.end();
});
