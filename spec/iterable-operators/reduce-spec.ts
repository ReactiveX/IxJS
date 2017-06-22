'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { of } from '../../dist/cjs/iterable/of';
import { reduce } from '../../dist/cjs/iterable/reduce';

test('Iterable#reduce no seed', t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x + y + i);
  t.equal(ys, 20);
  t.end();
});

test('Iterable#reduce no seed empty throws', t => {
  const xs = empty<number>();
  t.throws(() => reduce(xs, (x, y, i) => x + y + i));
  t.end();
});

test('Iterable#reduce with seed', t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('Iterable#reduce with seed empty', t => {
  const xs = empty<number>();
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});