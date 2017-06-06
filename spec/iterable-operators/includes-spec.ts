'use strict';

import * as test from 'tape';
import { includes } from '../../dist/cjs/iterable/includes';

test('Iterable#includes includes', t => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3);
  t.true(ys);
  t.end();
});

test('Iterable#includes does not include', t => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 6);
  t.false(ys);
  t.end();
});

test('Iterable#includes fromIndex hits', t => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3, 2);
  t.true(ys);
  t.end();
});

test('Iterable#includes fromIndex misses', t => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 1, 2);
  t.false(ys);
  t.end();
});