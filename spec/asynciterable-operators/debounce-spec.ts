import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.debounce]);
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#debounce none drop', async ([debounce]) => {
  const xs = async function*() {
    yield await delayValue(1, 100);
    yield await delayValue(2, 100);
    yield await delayValue(3, 100);
  };
  const ys = debounce(xs(), 50);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#debounce some drop', async ([debounce]) => {
  const xs = async function*() {
    yield await delayValue(1, 200);
    yield await delayValue(2, 200);
    yield await delayValue(3, 200);
  };
  const ys = debounce(xs(), 500);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await noNext(it);
});
