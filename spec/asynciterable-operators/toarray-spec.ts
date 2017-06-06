'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { from } from '../../dist/cjs/asynciterable/from';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { toArray } from '../../dist/cjs/asynciterable/toarray';

test('Iterable#toArray some', async (t: test.Test) => {
  const xs = [42, 25, 39];
  const ys = from(xs);
  const res = await toArray(ys);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#toArray empty', async (t: test.Test) => {
  const xs = empty<number>();
  const res = await toArray(xs);
  t.equal(res.length, 0);
  t.end();
});