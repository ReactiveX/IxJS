import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.memoize]);
const { concat } = Ix.asynciterable;
const { every } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { map } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;
const { zip } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#memoize memoizes effects', async ([memoize]) => {
  let n = 0;
  const rng = memoize(
    tick(async i => {
      n += i;
    })
  );

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

test('AsyncIterable#memoize single', async ([memoize]) => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);
  await hasNext(it1, 3);
  await hasNext(it1, 4);
  await noNext(it1);
});

test('AsyncIterable#memoize order of operations', async ([memoize]) => {
  const rng = memoize(range(0, 5));

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

test('AsyncIterable#memoize second early', async ([memoize]) => {
  const rng = memoize(range(0, 5));

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

test('AsyncIterable#memoize max two readers', async ([memoize]) => {
  const rng = memoize(range(0, 5), 2);

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await hasNext(it2, 2);

  const it3 = rng[Symbol.asyncIterator]();
  try {
    await it3.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#memoize concat with error', async ([memoize]) => {
  const error = new Error();
  const rng = memoize(concat(range(0, 2), _throw(error)));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  try {
    await it1.next();
  } catch (e) {
    expect(error).toEqual(e);
  }

  await hasNext(it2, 0);
  await hasNext(it2, 1);
  try {
    await it2.next();
  } catch (e) {
    expect(error).toEqual(e);
  }
});

function getRandom() {
  let min = 0,
    max = Math.pow(2, 53) - 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

async function* rand() {
  while (1) {
    yield getRandom();
  }
}

test('AsyncIterable#memoize should share effects of random', async ([memoize]) => {
  const rnd = memoize(take(rand(), 100));
  expect(await every(zip(async ([l, r]) => l === r, rnd, rnd), async x => x)).toBeTruthy();
});

test('AsyncIterable#memoize with selector', async ([memoize]) => {
  let n = 0;
  const res = await toArray(
    memoize(
      tap(range(0, 4), {
        next: async () => {
          n++;
        }
      }),
      undefined,
      xs => take(zip(async ([l, r]) => l + r, xs, xs), 4)
    )
  );

  expect(await sequenceEqual(from(res), map(range(0, 4), async x => x * 2))).toBeTruthy();
  expect(4).toBe(n);
});

test('AsyncIterable#memoize limited with selector', async ([memoize]) => {
  let n = 0;
  const res = await toArray(
    memoize(
      tap(range(0, 4), {
        next: async () => {
          n++;
        }
      }),
      2,
      xs => take(zip(async ([l, r]) => l + r, xs, xs), 4)
    )
  );

  expect(await sequenceEqual(from(res), map(range(0, 4), async x => x * 2))).toBeTruthy();
  expect(4).toBe(n);
});
