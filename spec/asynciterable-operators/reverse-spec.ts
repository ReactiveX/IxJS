import { hasNext, noNext } from '../asynciterablehelpers.js';
import { reverse } from 'ix/asynciterable/operators/index.js';
import { empty, of, throwError } from 'ix/asynciterable/index.js';

test('AsyncIterable#reverse empty', async () => {
  const xs = empty();
  const ys = xs.pipe(reverse());

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#revrse single element', async () => {
  const xs = of(42);
  const ys = xs.pipe(reverse());

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#reverse multiple elements', async () => {
  const xs = of(1, 2, 3);
  const ys = xs.pipe(reverse());

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#reverse throws', async () => {
  const xs = throwError(new Error());
  const ys = xs.pipe(reverse());

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});
