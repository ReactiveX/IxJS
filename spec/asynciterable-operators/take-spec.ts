import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.take]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#take zero or less takes nothing', async (t, [take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, -2);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take less than count', async (t, [take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take more than count', async (t, [take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 10);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#take throws with error', async (t, [take]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
