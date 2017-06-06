'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { minBy } from '../../dist/cjs/asynciterable/minby';
import { of } from '../../dist/cjs/asynciterable/of';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';

test('AsyncIterable#minBy', async t => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = minBy(source, async x => x % 3);
  t.true(await sequenceEqual(res, of(0, 3, 6)));
  t.end();
});

test('AsyncIterable#minBy empty throws', async t => {
  const source = empty<number>();

  try {
    await minBy(source, async x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});