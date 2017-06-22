'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { pairwise } from '../../dist/cjs/asynciterable/pairwise';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#pairwise empty return empty', async t => {
  const xs = empty<number>();
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#pairwise single returns empty', async t => {
  const xs = of(5);
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#pairwise behavior', async t => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, [5, 4]);
  await hasNext(t, it, [4, 3]);
  await hasNext(t, it, [3, 2]);
  await hasNext(t, it, [2, 1]);
  await noNext(t, it);
  t.end();
});