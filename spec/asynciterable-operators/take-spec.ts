import { of, throwError } from 'ix/asynciterable';
import { take } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#take zero or less takes nothing', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(take(-2));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#take less than count', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(take(2));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#take more than count', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(take(10));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#take throws with error', async () => {
  const err = new Error();
  const xs = throwError<number>(err);
  const ys = xs.pipe(take(xs, 2));

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
