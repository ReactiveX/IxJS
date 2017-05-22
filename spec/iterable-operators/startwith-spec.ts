'use strict';

import * as test from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { startWith } from '../../dist/cjs/iterable/startwith';
import { take } from '../../dist/cjs/iterable/take';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable#startWith adds to beginning', t => {
  const e = range(1, 5);
  const r = startWith(e, 0);
  t.true(sequenceEqual(r, range(0, 6)));
  t.end();
});

test('Iterable#startWith adds without causing effects', t => {
  let oops = false;
  const e = tap(range(1, 5), { next: ()=> oops = true });
  toArray(take(startWith(e, 0), 1));
  t.false(oops);
  t.end();
});