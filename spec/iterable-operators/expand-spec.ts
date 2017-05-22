'use strict';

import * as test from 'tape';
import { expand } from '../../dist/cjs/iterable/expand';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { take } from '../../dist/cjs/iterable/take';

test('Iterable#expand with single return behavior', t => {
  const res = take(expand([0], x => [x + 1]), 10);
  t.true(sequenceEqual(res, range(0, 10)));
  t.end();
});

test('Iterable#expand with range return behavior', t => {
  const res = expand([3], x => range(0, x));
  const exp = [
    3,
    0, 1, 2,
    0,
    0, 1,
    0
  ];

  t.true(sequenceEqual(res, exp));
  t.end();
});