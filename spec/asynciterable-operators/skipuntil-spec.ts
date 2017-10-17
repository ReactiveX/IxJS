import * as Ix from '../Ix';
import * as test from 'tape-async';
const { skipUntil } = Ix.asynciterable;
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#skipUntil hits', async t => {
  const xs = async function* () {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 600);
  };
  const ys = skipUntil(xs(), delayValue(42, 200));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skipUntil misses', async t => {
  const xs = async function* () {
    yield await delayValue(1, 400);
    yield await delayValue(2, 500);
    yield await delayValue(3, 600);
  };
  const ys = skipUntil(xs(), delayValue(42, 0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});
