'use strict';

import * as test from 'tape';
import { concat, concatAll } from '../../dist/cjs/asynciterable/concat';
import { map } from '../../dist/cjs/asynciterable/map';
import { of } from '../../dist/cjs/asynciterable/of';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { tap } from '../../dist/cjs/asynciterable/tap';

test('Iterable#concat concatAll behavior', async t => {
  const res = concatAll(of(of(1, 2, 3), of(4, 5)));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});

test('Iterable#concat concatAll order of effects', async t => {
  let i = 0;
  const xss = tap(map(range(0, 3), x => range(0, x + 1)), { next: async () => { ++i; } });
  const res = map(concatAll(xss), x => i + ' - ' + x);

  t.true(await sequenceEqual(res, of(
    '1 - 0',
    '2 - 0',
    '2 - 1',
    '3 - 0',
    '3 - 1',
    '3 - 2'
  )));
  t.end();
});

test('Iterable#concat behavior', async t => {
  const res = concat(of(1, 2, 3), of(4, 5));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});