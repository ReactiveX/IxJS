import * as Ix from '../Ix';
import * as test from 'tape-async';
const { throttle } = Ix.asynciterable;
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#throttle drops none', async t => {
  const xs = async function*() {
    yield await delayValue(1, 100);
    yield await delayValue(2, 100);
    yield await delayValue(3, 100);
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
    yield await delayValue(1, 200);
    yield await delayValue(2, 200);
    yield await delayValue(3, 200);
    yield await delayValue(4, 200);
  };
  const ys = throttle(xs(), 300);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});
