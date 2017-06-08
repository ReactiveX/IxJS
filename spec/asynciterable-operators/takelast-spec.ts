'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { skip } from '../../dist/cjs/asynciterable/skip';
import { takeLast } from '../../dist/cjs/asynciterable/takelast';

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