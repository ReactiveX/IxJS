'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { last } from '../../dist/cjs/asynciterable/last';
import { of } from '../../dist/cjs/asynciterable/of';

test('Iterable#last empty returns undefined', async (t: test.Test) => {
  const xs = empty<number>();
  const ys = await last(xs);
  t.equal(ys, undefined);
  t.end();
});

test('Iterable#last no predicate returns first', async (t: test.Test) => {
  const xs = of(1, 2, 3);
  const ys = await last(xs);
  t.equal(ys, 3);
  t.end();
});

test('Iterable#last predicate empty returns undefined', async (t: test.Test) => {
  const xs = empty<number>();
  const ys = await last(xs, async () => true);
  t.equal(ys, undefined);
  t.end();
});

test('Iterable#last predicate hits returns value', async (t: test.Test) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await last(xs, async x => x % 2 === 0);
  t.equal(ys, 4);
  t.end();
});

test('Iterable#last predicate misses returns undefined', async (t: test.Test) => {
  const xs = of(1, 3, 5);
  const ys = await last(xs, async x => x % 2 === 0);
  t.equal(ys, undefined);
  t.end();
});