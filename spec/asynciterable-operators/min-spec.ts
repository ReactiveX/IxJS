'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { min } from '../../dist/cjs/asynciterable/min';

test('AsyncItearble#min laws', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  t.equal(await min(xs), await min(xs, x => x));
  t.end();
});

test('AsyncIterable#min empty throws', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await min(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#min', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs);
  t.equal(res, 1);
  t.end();
});

test('AsyncIterable#min with selector empty throws', async (t: test.Test) => {
  const xs = empty<number>();
  try {
    await min(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#min with selector', async (t: test.Test) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs, async x => x * 2);
  t.equal(res, 2);
  t.end();
});