import { jest } from '@jest/globals';
import { hasNext, noNext } from '../asynciterablehelpers.js';
import { as, first, of, range, throwError } from 'ix/asynciterable/index.js';
import { skip } from 'ix/asynciterable/operators/index.js';

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
  const xs = throwError(err);
  const ys = xs.pipe(skip(2));

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});

test('Iterable#skip calls return() on source iterator when stopped early', async () => {
  const xs = range(0, 10)[Symbol.asyncIterator]();
  const returnSpy = jest.spyOn(xs, 'return');

  const res = as(xs).pipe(skip(2));

  await first(res);

  expect(returnSpy).toHaveBeenCalled();
});
