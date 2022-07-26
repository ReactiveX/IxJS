import { hasNext, noNext } from '../asynciterablehelpers';
import { of, range, throwError } from 'ix/asynciterable';
import { concatMap } from 'ix/asynciterable/operators';

test('AsyncIterable#concatMap with range', async () => {
  const xs = of(1, 2, 3);
  const ys = xs.pipe(concatMap(async (x) => range(0, x)));

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('AsyncIterable#concatMap selector returns throw', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(concatMap(async (x) => (x < 3 ? range(0, x) : throwError(err))));

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#concatMap with error throws', async () => {
  const err = new Error();
  const xs = throwError(err);
  const ys = xs.pipe(concatMap((x) => range(0, x)));

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#concatMap selector throws error', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(
    concatMap(async (x) => {
      if (x < 3) {
        return range(0, x);
      }
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  hasNext(it, 0);
  hasNext(it, 0);
  hasNext(it, 1);
  await expect(it.next()).rejects.toThrow(err);
});
