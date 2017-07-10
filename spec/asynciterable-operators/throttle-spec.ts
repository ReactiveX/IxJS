'use strict';

import * as test from 'tape';
import { throttle } from '../../dist/cjs/asynciterable/throttle';
import { hasNext, noNext } from '../asynciterablehelpers';

function delayItem<T>(item: T, delay: number) {
  return new Promise<T>(res => setTimeout(() => res(item), delay));
}

test('AsyncIterable#throttle drops none', async t => {
  const xs = async function*() {
    yield await delayItem(1, 100);
    yield await delayItem(2, 100);
    yield await delayItem(3, 100);
  };
  const ys = throttle(xs(), 50);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#throttle drops some', async t => {
  const xs = async function*() {
    yield await delayItem(1, 100);
    yield await delayItem(2, 100);
    yield await delayItem(3, 100);
    yield await delayItem(4, 100);
  };
  const ys = throttle(xs(), 200);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});