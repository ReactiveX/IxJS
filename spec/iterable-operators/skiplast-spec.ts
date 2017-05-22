'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { skipLast } from '../../dist/cjs/iterable/skiplast';
import { take } from '../../dist/cjs/iterable/take';

test('Iterable#skipLast empty', t => {
  const e = empty<number>();
  const r = skipLast(e, 1);
  t.true(sequenceEqual(r, e));
  t.end();
});

test('Iterable#skipLast partial', t => {
  const e = range(0, 5);
  const r = skipLast(e, 3);
  t.true(sequenceEqual(r, take(e, 2)));
  t.end();
});