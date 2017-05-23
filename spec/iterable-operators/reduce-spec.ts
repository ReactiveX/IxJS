'use strict';

import * as test from 'tape';
import { reduce } from '../../dist/cjs/iterable/reduce';

test('Iterable#reduce no seed', t => {
  const xs = [1, 2, 3, 4];
  const ys = reduce(xs, (x, y) => x * y);
  t.equal(ys, 24);
  t.end();
});

test('Iterable#reduce no seed empty throws', t => {
  const xs: number[] = [];
  t.throws(() => reduce(xs, (x, y) => x * y));
  t.end();
});

test('Iterable#reduce with seed', t => {
  const xs = [1, 2, 3, 4];
  const ys = reduce(xs, (x, y) => x * y, 1);
  t.equal(ys, 24);
  t.end();
});

test('Iterable#reduce with seed empty', t => {
  const xs: number[] = [];
  const ys = reduce(xs, (x, y) => x * y, 1);
  t.equal(ys, 1);
  t.end();
});