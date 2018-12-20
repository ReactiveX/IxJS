import * as Ix from '../Ix';
const { of } = Ix.AsyncIterable;
const { race } = Ix.asynciterable;
import { hasNext, noNext, delayValue } from '../asynciterablehelpers';

async function* delayedValues<T>(time: number, value: T, ...values: T[]): AsyncIterable<T> {
  yield await delayValue<T>(value, time);
  for (let item of values) {
    yield item;
  }
}

test('AsyncIterable#race left wins', async () => {
  const xs = of(42, 43, 44);
  const ys = delayedValues(100, 1, 2, 3);
  const res = race(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await hasNext(it, 43);
  await hasNext(it, 44);
  await noNext(it);
});

test('AsyncIterable#race right wins', async () => {
  const xs = delayedValues(100, 42, 43, 44);
  const ys = of(1, 2, 3);
  const res = race(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});
