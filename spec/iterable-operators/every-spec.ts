'use strict';

import * as test from 'tape';
import { every } from '../../dist/cjs/iterable/every';

test('Iterable#every some true', t => {
  const res = every([1, 2, 3, 4], x => x % 2 === 0);
  t.false(res);
  t.end();
});

test('Iterable#very all true', t => {
  const res = every([2, 8, 4, 6], x => x % 2 === 0);
  t.true(res);
  t.end();
});