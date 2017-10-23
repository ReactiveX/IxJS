import * as Ix from '../Ix';
import * as test from 'tape-async';
const { takeUntil } = Ix.asynciterable;
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#takeUntil hits', async t => {
  const xs = async function* () {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 1200);
  };
  const ys = takeUntil(xs(), delayValue(42, 500));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#takeUntil misses', async t => {
  const xs = async function* () {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 600);
  };
  const ys = takeUntil(xs(), delayValue(42, 1200));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});
