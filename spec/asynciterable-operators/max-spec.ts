'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { max } from '../../dist/cjs/asynciterable/max';

test('AsyncItearble#max laws', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  t.equal(await max(xs), await max(xs, x => x));
  t.end();
});

test('AsyncIterable#max empty throws', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await max(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#max', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs);
  t.equal(res, 5);
  t.end();
});

test('AsyncIterable#max with selector empty throws', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await max(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#max with selector', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs, async x => x * 2);
  t.equal(res, 10);
  t.end();
});