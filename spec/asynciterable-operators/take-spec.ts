'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/asynciterable/of';
import { take } from '../../dist/cjs/asynciterable/take';
import { _throw } from '../../dist/cjs/asynciterable/throw';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#take zero or less takes nothing', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, -2);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take less than count', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take more than count', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 10);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take throws with error', async t => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});