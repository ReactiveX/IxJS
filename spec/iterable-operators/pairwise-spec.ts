'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { of } from '../../dist/cjs/iterable/of';
import { pairwise } from '../../dist/cjs/iterable/pairwise';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#pairwise empty return empty', t => {
  const xs = empty<number>();
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#pairwise single returns empty', t => {
  const xs = of(5);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#pairwise behavior', t => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = pairwise(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, [5, 4]);
  hasNext(t, it, [4, 3]);
  hasNext(t, it, [3, 2]);
  hasNext(t, it, [2, 1]);
  noNext(t, it);
  t.end();
});