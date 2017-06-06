'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/asynciterable/of';
import { toMap } from '../../dist/cjs/asynciterable/tomap';

test('AsyncIterable#toMap stores values', async (t: test.Test) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2);
  t.equal(res.get(0), 4);
  t.equal(res.get(1), 1);
  t.end();
});

test('AsyncIterable#toMap overwrites duplicates', async (t: test.Test) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2);
  t.equal(res.get(0), 2);
  t.equal(res.get(1), 1);
  t.end();
});

test('AsyncIterable#toMap with element selector', async (t: test.Test) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  t.equal(res.get(0), 5);
  t.equal(res.get(1), 2);
  t.end();
});

test('AsyncIterable#toMap with element selector overwrites duplicates', async (t: test.Test) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  t.equal(res.get(0), 3);
  t.equal(res.get(1), 2);
  t.end();
});