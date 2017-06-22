'use strict';

import * as test from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { scan } from '../../dist/cjs/iterable/scan';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#scan no seed', t => {
  const res = scan(range(0, 5), (n, x, i) => n + x + i);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 2);
  hasNext(t, it, 6);
  hasNext(t, it, 12);
  hasNext(t, it, 20);
  noNext(t, it);
  t.end();
});

test('Iterable#scan with seed', t => {
  const res = scan(range(0, 5), (n, x, i) => n - x - i, 20);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 20);
  hasNext(t, it, 18);
  hasNext(t, it, 14);
  hasNext(t, it, 8);
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});