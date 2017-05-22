'use strict';

import * as test from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { scan } from '../../dist/cjs/iterable/scan';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#scan no seed', t => {
  const res = scan(range(0, 5), (n, x) => n + x);
  t.true(sequenceEqual(res, [1, 3, 6, 10]));
  t.end();
});

test('Iterable#scan with seed', t => {
  const res = scan(range(0, 5), (n, x) => n - x, 10);
  t.true(sequenceEqual(res, [10, 9, 7, 4, 0]));
  t.end();
});