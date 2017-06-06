'use strict';

import * as test from 'tape';
import { from } from '../../dist/cjs/asynciterable/from';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#from from promise list', async t => {
  const xs: Iterable<Promise<number>> = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

async function* getData() {
  yield 1;
  yield 2;
  yield 3;
}

test('AsyncIterable#from from async generator', async t => {
  const xs = getData();
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array/iterable', async t => {
  const xs = [1, 2, 3];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array/iterable with selector', async t => {
  const xs = [1, 2, 3];
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from async generator with selector', async t => {
  const xs = getData();
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from empty array/iterable', async t => {
  const xs: number[] = [];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array-like', async t => {
  const xs = { length: 3 };
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array-like with selector', async t => {
  const xs = { length: 3 };
  const res = from(xs, (x, i) => i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});