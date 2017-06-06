'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { from } from '../../dist/cjs/asynciterable/from';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { toSet } from '../../dist/cjs/asynciterable/toset';

test('AsyncIterable#toSet non-empty', async (t: test.Test) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = from(xs);
  const res = await toSet(ys);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('AsyncIterable#toSet empty', async (t: test.Test) => {
  const xs = empty<number>();
  const res = await toSet(xs);
  t.equal(res.size, 0);
  t.end();
});

test('AsyncIterable#toSet trims', async (t: test.Test) => {
  const xs = from([1, 2, 3, 3, 2, 1]);
  const ys = [1, 2, 3];
  const res = await toSet(xs);
  t.true(sequenceEqual(res, ys));
  t.end();
});