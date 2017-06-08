'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { skipLast } from '../../dist/cjs/asynciterable/skiplast';
import { take } from '../../dist/cjs/asynciterable/take';

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