'use strict';

import  * as test  from 'tape';
import { buffer } from '../../dist/cjs/iterable/buffer';
import { empty } from '../../dist/cjs/iterable/empty';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { toArray } from '../../dist/cjs/iterable/toArray';

test('Iterable#buffer no skip non-full buffer', t => {
  const rng = range(0, 10);

  const res = toArray(buffer(rng, 3));
  t.equal(4, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [3, 4, 5]));
  t.true(sequenceEqual(res[2], [6, 7, 8]));
  t.true(sequenceEqual(res[3], [9]));
  t.end();
});

test('Iterable#buffer no skip all full', t => {
  const rng = range(0, 10);

  const res = toArray(buffer(rng, 5));
  t.equal(2, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2, 3, 4]));
  t.true(sequenceEqual(res[1], [5, 6, 7, 8, 9]));
  t.end();
});

test('Iterable#buffer no skip empty buffer', t => {
  const rng = empty<number>();

  const res = toArray(buffer(rng, 5));
  t.equal(0, res.length);
  t.end();
});

test('Iterable#buffer skip non-full buffer', t => {
  const rng = range(0, 10);

  const res = toArray(buffer(rng, 3, 2));
  t.equal(5, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [2, 3, 4]));
  t.true(sequenceEqual(res[2], [4, 5, 6]));
  t.true(sequenceEqual(res[3], [6, 7, 8]));
  t.true(sequenceEqual(res[4], [8, 9]));
  t.end();
});

test('Iterable#buffer skip full buffer', t => {
  const rng = range(0, 10);

  const res = toArray(buffer(rng, 3, 4));
  t.equal(3, res.length);

  t.true(sequenceEqual(res[0], [0, 1, 2]));
  t.true(sequenceEqual(res[1], [4, 5, 6]));
  t.true(sequenceEqual(res[2], [8, 9]));
  t.end();
});