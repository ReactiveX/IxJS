import * as Ix from '../Ix';
import * as test from 'tape';
const { buffer } = Ix.asynciterable;
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#buffer no skip non-full buffer', async t => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3));
  t.equal(4, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [3, 4, 5]));
  t.true(sequenceEqual(res[2], [6, 7, 8]));
  t.true(sequenceEqual(res[3], [9]));
  t.end();
});

test('AsyncIterable#buffer no skip all full', async t => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 5));
  t.equal(2, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2, 3, 4]));
  t.true(sequenceEqual(res[1], [5, 6, 7, 8, 9]));
  t.end();
});

test('AsyncIterable#buffer no skip empty buffer', async t => {
  const rng = empty<number>();

  const res = await toArray(buffer(rng, 5));
  t.equal(0, res.length);
  t.end();
});

test('AsyncIterable#buffer skip non-full buffer', async t => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3, 2));
  t.equal(5, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [2, 3, 4]));
  t.true(sequenceEqual(res[2], [4, 5, 6]));
  t.true(sequenceEqual(res[3], [6, 7, 8]));
  t.true(sequenceEqual(res[4], [8, 9]));
  t.end();
});

test('AsyncIterable#buffer skip full buffer', async t => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3, 4));
  t.equal(3, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [4, 5, 6]));
  t.true(sequenceEqual(res[2], [8, 9]));
  t.end();
});
