'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { maxBy } from '../../dist/cjs/asynciterable/maxby';
import { of } from '../../dist/cjs/asynciterable/of';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';

test('Iterable#maxBy', async t => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await maxBy(source, async x => x % 3);
  t.true(sequenceEqual(res, of(2, 5, 2)));
  t.end();
});

test('Iterable#maxBy empty throws', async t => {
  const source = empty<number>();

  try {
    await maxBy(source, async x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});