'use strict';

import * as test from 'tape';
import { concat, concatAll } from '../../dist/cjs/iterable/concat';
import { map } from '../../dist/cjs/iterable/map';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { tap } from '../../dist/cjs/iterable/tap';

test('Iterable#concat concatAll behavior', t => {
  const res = concatAll([[1, 2, 3], [4, 5]]);
  t.true(sequenceEqual(res, [1, 2, 3, 4, 5]));
  t.end();
});

test('Iterable#concat concatAll order of effects', t => {
  let i = 0;
  const xss = tap(map(range(0, 3), x => range(0, x + 1)), { next: () => ++i });
  const res = map(concatAll(xss), x => i + ' - ' + x);

  t.true(sequenceEqual(res, [
    '1 - 0',
    '2 - 0',
    '2 - 1',
    '3 - 0',
    '3 - 1',
    '3 - 2'
  ]));
  t.end();
});

test('Iterable#concat behavior', t => {
  const res = concat([1, 2, 3], [4, 5]);
  t.true(sequenceEqual(res, [1, 2, 3, 4, 5]));
  t.end();
});