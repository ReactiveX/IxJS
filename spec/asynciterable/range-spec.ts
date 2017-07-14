import * as Ix from '../Ix';
import  * as test  from 'tape';
const { range } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#range produces values', async (t: test.Test) => {
  const xs = range(2, 5);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await hasNext(t, it, 5);
  await hasNext(t, it, 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#range empty', async (t: test.Test) => {
  const xs = range(2, 0);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});
