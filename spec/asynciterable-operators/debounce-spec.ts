import { hasNext, noNext, delayValue } from '../asynciterablehelpers';
import { debounce } from 'ix/asynciterable/operators';
import { as } from 'ix/asynciterable';

test.skip(
  'AsyncIterable#debounce none drop',
  async () => {
    const xs = async function*() {
      yield await delayValue(1, 100);
      yield await delayValue(2, 100);
      yield await delayValue(3, 100);
    };
    const ys = as(xs()).pipe(debounce(50));

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasNext(it, 2);
    await hasNext(it, 3);
    await noNext(it);
  },
  10 * 1000
);

test.skip(
  'AsyncIterable#debounce some drop',
  async () => {
    const xs = async function*() {
      yield await delayValue(1, 200);
      yield await delayValue(2, 200);
      yield await delayValue(3, 200);
    };
    const ys = as(xs()).pipe(debounce(500));

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasNext(it, 3);
    await noNext(it);
  },
  10 * 1000
);
