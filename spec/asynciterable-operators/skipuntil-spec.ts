import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.skipUntil]);
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#skipUntil hits', async ([skipUntil]) => {
  const xs = async function*() {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 600);
  };
  const ys = skipUntil(xs(), () => delayValue(42, 200));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#skipUntil misses', async ([skipUntil]) => {
  const xs = async function*() {
    yield await delayValue(1, 400);
    yield await delayValue(2, 500);
    yield await delayValue(3, 600);
  };
  const ys = skipUntil(xs(), () => delayValue(42, 0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});
