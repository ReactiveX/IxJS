import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#toArray some', async (t: test.Test) => {
  const xs = [42, 25, 39];
  const ys = from(xs);
  const res = await toArray(ys);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#toArray empty', async (t: test.Test) => {
  const xs = empty<number>();
  const res = await toArray(xs);
  t.equal(res.length, 0);
  t.end();
});
