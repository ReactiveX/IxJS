'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/asynciterable/empty';
import { filter } from '../../dist/cjs/asynciterable/filter';
import { of } from '../../dist/cjs/asynciterable/of';
import { _throw } from '../../dist/cjs/asynciterable/throw';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#filter', async t => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 8);
  await hasNext(t, it, 4);
  await hasNext(t, it, 6);
  await hasNext(t, it, 2);
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#filter with index', async t => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = filter(xs, async (x, i) => i % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 8);
  await hasNext(t, it, 7);
  await hasNext(t, it, 6);
  await hasNext(t, it, 2);
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#filter throws part way through', async t => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = filter(xs, async x => { if (x === 4) { throw err; } return true; });

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 8);
  await hasNext(t, it, 5);
  await hasNext(t, it, 7);
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#filter with index throws part way through', async t => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = filter(xs, async (x, i) => { if (i === 3) { throw err; } return true; });

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 8);
  await hasNext(t, it, 5);
  await hasNext(t, it, 7);
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#filter with error source', async t => {
  const xs = _throw<number>(new Error());
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#filter with empty source', async t => {
  const xs = empty<number>();
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});