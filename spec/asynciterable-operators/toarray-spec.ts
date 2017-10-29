import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toArray]);
const { empty } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#toArray some', async (t, [toArray]) => {
  const xs = [42, 25, 39];
  const ys = from(xs);
  const res = await toArray(ys);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#toArray empty', async (t, [toArray]) => {
  const xs = empty<number>();
  const res = await toArray(xs);
  t.equal(res.length, 0);
  t.end();
});
