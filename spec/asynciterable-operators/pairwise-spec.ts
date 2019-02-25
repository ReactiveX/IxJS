import { empty, of } from 'ix/asynciterable';
import { pairwise } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#pairwise empty return empty', async () => {
  const xs = empty<number>();
  const ys = xs.pipe(pairwise());

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#pairwise single returns empty', async () => {
  const xs = of(5);
  const ys = xs.pipe(pairwise());

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#pairwise behavior', async () => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = xs.pipe(pairwise());

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, [5, 4]);
  await hasNext(it, [4, 3]);
  await hasNext(it, [3, 2]);
  await hasNext(it, [2, 1]);
  await noNext(it);
});
