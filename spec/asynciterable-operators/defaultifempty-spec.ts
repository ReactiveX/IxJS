import { empty, of, throwError } from 'ix/asynciterable';
import { defaultIfEmpty } from 'ix/asynciterable/operators';
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#defaultIfEmpty with empty', async () => {
  const xs = empty<number>();
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
  const xs = throwError<number>(new Error());
  const ys = xs.pipe(defaultIfEmpty(0));

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
