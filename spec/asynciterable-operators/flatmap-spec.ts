import { hasNext, hasErr } from '../asynciterablehelpers';
import { of, range, throwError, toArray } from 'ix/asynciterable';
import { flatMap } from 'ix/asynciterable/operators';

test('AsyncIterable#flatMap with range', async () => {
  const xs = of(1, 2, 3);
  const ys = xs.pipe(flatMap(async (x) => range(0, x)));

  expect(await toArray(ys)).toEqual([0, 0, 0, 1, 1, 2]);
});

test(`AsyncIterable#flatMap with fewer inputs than max concurrent doesn't throw`, async () => {
  const xs = of(1, 2);
  const ys = xs.pipe(flatMap(async (x) => range(0, x), 3));

  expect(await toArray(ys)).toEqual([0, 0, 1]);
});

test('AsyncIterable#flatMap selector returns throw', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(flatMap((x) => (x < 3 ? range(0, x) : throwError(err))));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasErr(it, err);
});

test('AsyncIterable#flatMap async selector returns throw', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(flatMap(async (x) => (x < 3 ? range(0, x) : throwError(err))));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasErr(it, err);
});

test('AsyncIterable#flatMap with error throws', async () => {
  const err = new Error();
  const xs = throwError(err);
  const ys = xs.pipe(flatMap((x) => range(0, x)));

  const it = ys[Symbol.asyncIterator]();
  await hasErr(it, err);
});

test('AsyncIterable#flatMap selector throws error', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(
    flatMap((x) => {
      if (x < 3) {
        return range(0, x);
      }
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasErr(it, err);
});

test('AsyncIterable#flatMap async selector throws error', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = xs.pipe(
    flatMap(async (x) => {
      if (x < 3) {
        return range(0, x);
      }
      throw err;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 0);
  await hasErr(it, err);
});
