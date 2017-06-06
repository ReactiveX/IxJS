'use strict';

import * as test from 'tape';
import { generate } from '../../dist/cjs/asynciterable/generate';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#generate generates normal sequence', async (t: test.Test) => {
  const xs = generate(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => x * x
  );

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 4);
  await hasNext(t, it, 9);
  await hasNext(t, it, 16);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#generate condition throws', async (t: test.Test) => {
  const err = new Error();
  const xs = generate(
    0,
    async x => { throw err; },
    async x => x + 1,
    async x => x * x
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#generate increment throws', async (t: test.Test) => {
  const err = new Error();
  const xs = generate(
    0,
    async x => x < 5,
    async x => { throw err; },
    async x => x * x
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#generate result selector throws', async (t: test.Test) => {
  const err = new Error();
  const xs = generate(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => { throw err; }
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});