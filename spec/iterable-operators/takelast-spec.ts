'use strict';

import * as test from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { skip } from '../../dist/cjs/iterable/skip';
import { takeLast } from '../../dist/cjs/iterable/takelast';

test('Iterable#takeLast none', t => {
  const res = takeLast(range(1, 5), 0);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast empty', t => {
  const res = takeLast([], 1);
  t.true(sequenceEqual(res, []));
  t.end();
});

test('Iterable#takeLast has all', t => {
  const e = range(0, 5);
  const r = takeLast(e, 5);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#takeLast has part', t => {
  const e = range(0, 5);
  const r = takeLast(e, 3);
  t.true(sequenceEqual(r, skip(e, 2)));
  t.end();
});