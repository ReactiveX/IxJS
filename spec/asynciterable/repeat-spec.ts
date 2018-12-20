import * as Ix from '../Ix';
const { repeatStatic } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#repeat repeats value finitely', async () => {
  const xs = repeatStatic(2, 5);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#repeat repeat zero times', async () => {
  const xs = repeatStatic(2, 0);

  const it = xs[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#repeat repeats value infinitely', async () => {
  const xs = repeatStatic(2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
  await hasNext(it, 2);
});
