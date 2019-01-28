import { range } from 'ix/asynciterable';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#range produces values', async () => {
  const xs = range(2, 5);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await hasNext(it, 5);
  await hasNext(it, 6);
  await noNext(it);
});

test('AsyncIterable#range empty', async () => {
  const xs = range(2, 0);

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});
