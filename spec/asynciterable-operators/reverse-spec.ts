import { hasNext, noNext } from '../asynciterablehelpers';
import { reverse } from 'ix/asynciterable/operators';
import { empty, of, throwError } from 'ix/asynciterable';

test('AsyncIterable#reverse empty', async () => {
  const xs = empty<number>();
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
  const xs = throwError<number>(new Error());
  const ys = xs.pipe(reverse());

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
