import { hasNext, noNext, delayValue } from '../asynciterablehelpers';
import { memoize } from 'ix/asynciterable/operators';
import { as, defer, concat, range, throwError } from 'ix/asynciterable';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#memoize memoizes effects', async () => {
  let n = 0;
  const rng = as(
    tick(async (i) => {
      n += i;
    })
  ).pipe(memoize());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  expect(0).toBe(n);

  await hasNext(it1, 1);
  expect(1).toBe(n);

  await hasNext(it1, 2);
  expect(3).toBe(n);
  await hasNext(it2, 0);
  expect(3).toBe(n);

  await hasNext(it1, 3);
  expect(6).toBe(n);
  await hasNext(it2, 1);
  expect(6).toBe(n);

  await hasNext(it2, 2);
  expect(6).toBe(n);
  await hasNext(it2, 3);
  expect(6).toBe(n);

  await hasNext(it2, 4);
  expect(10).toBe(n);
  await hasNext(it1, 4);
  expect(10).toBe(n);
});

test('AsyncIterable#memoize pulls each value from the source only once', async () => {
  const length = 10;
  const valuesProduced = [] as number[];
  const source = defer(async function* () {
    let i = -1;
    while (++i < length) {
      valuesProduced.push(i);
      yield await delayValue(i, 100);
    }
  }).pipe(memoize());

  const valuesExpected = Array.from({ length }, (_, i) => i);

  // create 10 consumers
  // prettier-ignore
  await Promise.all(valuesExpected.map(() => source.forEach(() => {
    // prettier-ignore
    /* */
  })));

  expect(valuesProduced).toEqual(valuesExpected);
});

test('AsyncIterable#memoize single', async () => {
  const rng = range(0, 5).pipe(memoize());

  const it1 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);
  await hasNext(it1, 3);
  await hasNext(it1, 4);
  await noNext(it1);
});

test('AsyncIterable#memoize order of operations', async () => {
  const rng = range(0, 5).pipe(memoize());

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);
  await hasNext(it1, 3);
  await hasNext(it1, 4);
  await noNext(it1);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await hasNext(it2, 2);
  await hasNext(it2, 3);
  await hasNext(it2, 4);
  await noNext(it2);
});

test('AsyncIterable#memoize second early', async () => {
  const rng = range(0, 5).pipe(memoize());

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 3);
  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await hasNext(it1, 4);
  await hasNext(it2, 2);
  await noNext(it1);

  await hasNext(it2, 3);
  await hasNext(it2, 4);
  await noNext(it2);
});

test('AsyncIterable#memoize max two readers', async () => {
  const rng = range(0, 5).pipe(memoize(2));

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await hasNext(it2, 2);

  const it3 = rng[Symbol.asyncIterator]();
  await expect(it3.next()).rejects.toThrow();
});

test('AsyncIterable#memoize concat with error', async () => {
  const error = new Error();
  const rng = concat(range(0, 2), throwError(error)).pipe(memoize());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await expect(it1.next()).rejects.toThrow(error);

  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await expect(it2.next()).rejects.toThrow(error);
});
