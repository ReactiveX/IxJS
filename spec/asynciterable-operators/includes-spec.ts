'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/asynciterable/of';
import { includes } from '../../dist/cjs/asynciterable/includes';

test('AsyncIterable#includes includes', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3);
  t.true(ys);
  t.end();
});

test('AsyncIterable#includes does not include', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 6);
  t.false(ys);
  t.end();
});

test('AsyncIterable#includes fromIndex hits', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3, 2);
  t.true(ys);
  t.end();
});

test('AsyncIterable#includes fromIndex misses', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 1, 2);
  t.false(ys);
  t.end();
});