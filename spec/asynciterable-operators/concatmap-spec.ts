import { hasNext, hasErr, noNext } from '../asynciterablehelpers';
import { of, range, sequenceEqual, throwError } from 'ix/asynciterable';
import { map, tap, concatMap } from 'ix/asynciterable/operators';

test('AsyncIterable#concatMap with range', async () => {
  const xs = of(1, 2, 3);
  const ys = xs.pipe(concatMap(async (x) => range(0, x)));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#concatMap order of effects', async () => {
  let i = 0;
  const res = range(0, 3).pipe(
    tap({ next: async () => ++i }),
    concatMap((x) => range(0, x + 1)),
    map((x) => i + ' - ' + x)
  );

  expect(
    await sequenceEqual(res, of('1 - 0', '2 - 0', '2 - 1', '3 - 0', '3 - 1', '3 - 2'))
  ).toBeTruthy();
});

test('AsyncIterable#concatMap selector returns throw', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(concatMap(async (x) => (x < 3 ? range(0, x) : throwError(err))));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasErr(it, err);
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
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasErr(it, err);
});
