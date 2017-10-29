import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toSet]);
const { empty } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#toSet non-empty', async (t, [toSet]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = from(xs);
  const res = await toSet(ys);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#toSet empty', async (t, [toSet]) => {
  const xs = empty<number>();
  const res = await toSet(xs);
  t.equal(res.size, 0);
  t.end();
});

test('AsyncIterable#toSet trims', async (t, [toSet]) => {
  const xs = from([1, 2, 3, 3, 2, 1]);
  const ys = [1, 2, 3];
  const res = await toSet(xs);
  t.true(sequenceEqual(res, ys));
  t.end();
});
