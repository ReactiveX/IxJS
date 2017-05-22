'use strict';

import * as test from 'tape';
import { distinctUntilChanged } from '../../dist/cjs/iterable/distinctuntilchanged';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';

test('Iterable#distinctUntilChanged no selector', t => {
  const res = distinctUntilChanged([1, 2, 2, 3, 3, 3, 2, 2, 1]);
  t.true(sequenceEqual(res, [1, 2, 3, 2, 1]));
  t.end();
});

test('Iterable#distinctUntilChanged with selector', t => {
  const res = distinctUntilChanged([1, 1, 2, 3, 4, 5, 5, 6, 7], x => Math.floor(x / 2));
  t.true(sequenceEqual(res, [1, 2, 4, 6]));
  t.end();
});