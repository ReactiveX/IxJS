'use strict';

import * as test from 'tape';
import { expand } from '../../dist/cjs/asynciterable/expand';
import { of } from '../../dist/cjs/asynciterable/of';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { take } from '../../dist/cjs/asynciterable/take';

test('Iterable#expand with single return behavior', async t => {
  const res = take(expand(of(0), async x => of(x + 1)), 10);
  t.true(await sequenceEqual(res, range(0, 10)));
  t.end();
});

test('Iterable#expand with range return behavior', async t => {
  const res = expand(of(3), async x => range(0, x));
  const exp = of(
    3,
    0, 1, 2,
    0,
    0, 1,
    0
  );

  t.true(await sequenceEqual(res, exp));
  t.end();
});