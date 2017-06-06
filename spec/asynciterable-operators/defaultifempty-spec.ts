'use strict';

import * as test from 'tape';
import { defaultIfEmpty } from '../../dist/cjs/asynciterable/defaultifempty';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { of } from '../../dist/cjs/asynciterable/of';
import { _throw } from '../../dist/cjs/asynciterable/throw';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#defaultIfEmpty with empty', async t => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#defaultIfEmpty with no empty', async t => {
  const xs = of(42);
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#defaultIfEmpty throws', async t => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});