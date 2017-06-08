'use strict';

import * as test from 'tape';
import { of } from '../../dist/cjs/asynciterable/of';
import { scan } from '../../dist/cjs/asynciterable/scan';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#scan with seed', async t => {
  const xs = scan(of(1, 2, 3), async (x, y) => x + y, 8);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 9);
  await hasNext(t, it, 11);
  await hasNext(t, it, 14);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#scan no seed', async t => {
  const xs = scan(of(1, 2, 3), async (x, y) => x + y);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#scan with seed selector throws', async t => {
  const err = new Error();
  const xs = scan(of(1, 2, 3), async (x, y) => { throw err; }, 8);

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#scan no seed selector throws', async t => {
  const err = new Error();
  const xs = scan(of(1, 2, 3), async (x, y) => { throw err; });

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});