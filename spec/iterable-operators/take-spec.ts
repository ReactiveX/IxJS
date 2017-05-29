'use strict';

import * as test from 'tape';
import { take } from '../../dist/cjs/iterable/take';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#take zero or less takes nothing', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, -2);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#take less than count', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#take more than count', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 10);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});