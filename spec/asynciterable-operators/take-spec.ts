import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.take]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#take zero or less takes nothing', async ([take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, -2);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#take less than count', async ([take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#take more than count', async ([take]) => {
  const xs = of(1, 2, 3, 4);
  const ys = take(xs, 10);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#take throws with error', async ([take]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = take(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
