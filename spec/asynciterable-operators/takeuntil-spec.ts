import { as } from 'ix/asynciterable';
import { takeUntil } from 'ix/asynciterable/operators';
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

test('AsyncIterable#takeUntil hits', async () => {
  const xs = async function*() {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 1200);
  };
  const ys = as(xs()).pipe(takeUntil(() => delayValue(42, 500)));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#takeUntil misses', async () => {
  const xs = async function*() {
    yield await delayValue(1, 100);
    yield await delayValue(2, 300);
    yield await delayValue(3, 600);
  };
  const ys = as(xs()).pipe(takeUntil(() => delayValue(42, 1200)));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});
