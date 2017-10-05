import * as Ix from '../Ix';
import * as test from 'tape-async';
const { repeatStatic } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#repeat repeats value finitely', async (t: test.Test) => {
  const xs = repeatStatic(2, 5);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#repeat repeat zero times', async (t: test.Test) => {
  const xs = repeatStatic(2, 0);

  const it = xs[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#repeat repeats value infinitely', async (t: test.Test) => {
  const xs = repeatStatic(2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  await hasNext(t, it, 2);
  t.end();
});
