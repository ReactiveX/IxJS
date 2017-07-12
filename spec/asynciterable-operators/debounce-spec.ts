import * as Ix from '../Ix';
import * as test from 'tape';
const { debounce } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

function delayItem<T>(item: T, delay: number) {
  return new Promise<T>(res => setTimeout(() => res(item), delay));
}

test('AsyncIterable#debounce none drop', async t => {
  const xs = async function*() {
    yield await delayItem(1, 100);
    yield await delayItem(2, 100);
    yield await delayItem(3, 100);
  };
  const ys = debounce(xs(), 50);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#debounce some drop', async t => {
  const xs = async function*() {
    yield await delayItem(1, 100);
    yield await delayItem(2, 100);
    yield await delayItem(3, 100);
  };
  const ys = debounce(xs(), 300);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});
