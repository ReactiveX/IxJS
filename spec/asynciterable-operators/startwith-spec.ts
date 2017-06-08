'use strict';

import * as test from 'tape';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { startWith } from '../../dist/cjs/asynciterable/startwith';
import { take } from '../../dist/cjs/asynciterable/take';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { toArray } from '../../dist/cjs/asynciterable/toarray';

test('AsyncIterable#startWith adds to beginning', async t => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  t.true(await sequenceEqual(r, range(0, 6)));
  t.end();
});

test('AsyncIterable#startWith adds without causing effects', async t => {
  let oops = false;
  const e = tap(range(1, 5), { next: async () => { oops = true; } });
  await toArray(take(startWith(e, 0), 1));
  t.false(oops);
  t.end();
});