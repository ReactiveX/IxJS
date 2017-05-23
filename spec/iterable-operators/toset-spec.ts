'use strict';

import * as test from 'tape';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { toSet } from '../../dist/cjs/iterable/toset';

test('Iterable#toSet non-empty', t => {
  const xs = [1, 2, 3, 4, 5];
  const res = toSet(xs);
  t.true(sequenceEqual(res, xs));
  t.end();
});

test('Iterable#toSet empty', t => {
  const res = toSet<number>([]);
  t.equal(res.size, 0);
  t.end();
});

test('Iterable#toSet trims', t => {
  const xs = [1, 2, 3, 3, 2, 1];
  const ys = [1, 2, 3];
  const res = toSet(xs);
  t.true(sequenceEqual(res, ys));
  t.end();
});