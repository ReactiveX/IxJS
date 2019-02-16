import { of, throwError } from 'ix/asynciterable';
import { skip } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#skip skips some', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skip(2));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skip skips more than count', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skip(10));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#skip none', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = xs.pipe(skip(0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skip throws', async () => {
  const err = new Error();
  const xs = throwError<number>(err);
  const ys = xs.pipe(skip(2));

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
