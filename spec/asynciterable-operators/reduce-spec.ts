'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { reduce } from '../../dist/cjs/asynciterable/reduce';
import { _throw } from '../../dist/cjs/asynciterable/throw';

test('AsyncIterable#reduce no seed', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);
  const ys = await reduce(xs, async (x, y) => x * y);

  t.equal(ys, 24);
  t.end();
});

test('AsyncIterable#reduce empty throws', async (t: test.Test) => {
  const xs = empty<number>();

  try {
    await reduce(xs, async (x, y) => x * y);
  } catch (e) {
    t.assert(e != null);
  }

  t.end();
});

test('AsyncIterable#reduce errored throws', async (t: test.Test) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await reduce(xs, async (x, y) => x * y);
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});

test('AsyncIterable#reduce selector', async (t: test.Test) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await reduce(xs, async () => { throw err; });
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});

test('AsyncIterable#reduce wity seed', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4);
  const ys = await reduce(xs, async (x, y) => x * y, 1);

  t.equal(ys, 24);
  t.end();
});

test('AsyncIterable#reduce empty with seed returns seed', async (t: test.Test) => {
  const xs = empty<number>();
  const ys = await reduce(xs, async (x, y) => x * y, 1);

  t.equal(ys, 1);
  t.end();
});

test('AsyncIterable#reduce errored throws', async (t: test.Test) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await reduce(xs, async (x, y) => x * y, 1);
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});

test('AsyncIterable#reduce selector', async (t: test.Test) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await reduce(xs, async () => { throw err; }, 1);
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});