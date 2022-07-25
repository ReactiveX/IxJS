import { hasNext, noNext, delayValue } from '../asynciterablehelpers';
import { throttle } from 'ix/asynciterable/operators';
import { as } from 'ix/asynciterable';

test('AsyncIterable#throttle drops none', async () => {
  const xs = async function* () {
    yield await delayValue(1, 100);
    yield await delayValue(2, 100);
    yield await delayValue(3, 100);
  };
  const ys = as(xs()).pipe(throttle(50));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#throttle drops some', async () => {
  const xs = async function* () {
    yield await delayValue(1, 200);
    yield await delayValue(2, 200);
    yield await delayValue(3, 200);
    yield await delayValue(4, 200);
  };
  const ys = as(xs()).pipe(throttle(300));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await noNext(it);
});
