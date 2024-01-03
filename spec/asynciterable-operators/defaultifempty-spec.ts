import { hasNext, noNext } from '../asynciterablehelpers.js';
import { empty, of, throwError } from 'ix/asynciterable/index.js';
import { defaultIfEmpty } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#defaultIfEmpty with empty', async () => {
  const xs = empty();
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#defaultIfEmpty with no empty', async () => {
  const xs = of(42);
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#defaultIfEmpty throws', async () => {
  const xs = throwError(new Error());
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});
