import { hasNext, noNext } from '../asynciterablehelpers';
import { slice } from 'ix/asynciterable/operators';
import { as } from 'ix/asynciterable';

test('AsyncIterable#slice slices at zero with one item', async () => {
  const xs = as([1, 2, 3, 4]);
  const ys = xs.pipe(slice(0, 1));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with one item', async () => {
  const xs = as([1, 2, 3, 4]);
  const ys = xs.pipe(slice(1, 1));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with multiple items', async () => {
  const xs = as([1, 2, 3, 4]);
  const ys = xs.pipe(slice(1, 2));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with no end', async () => {
  const xs = as([1, 2, 3, 4]);
  const ys = xs.pipe(slice(1));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#slice slices at zero with no end', async () => {
  const xs = as([1, 2, 3, 4]);
  const ys = xs.pipe(slice(0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});
