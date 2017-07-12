import * as Ix from '../Ix';
import  * as test  from 'tape';
const { concat } = Ix.asynciterable;
const { every } = Ix.asynciterable;
const { from } = Ix.asynciterable;
const { map } = Ix.asynciterable;
const { memoize } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;
const { zip } = Ix.asynciterable;
import { hasNext  , noNext } from '../asynciterablehelpers';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#memoize memoizes effects', async t => {
  let n = 0;
  const rng = memoize(tick(async i => { n += i; }));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  t.equal(0, n);

  await hasNext(t, it1, 1);
  t.equal(1, n);

  await hasNext(t, it1, 2);
  t.equal(3, n);
  await hasNext(t, it2, 0);
  t.equal(3, n);

  await hasNext(t, it1, 3);
  t.equal(6, n);
  await hasNext(t, it2, 1);
  t.equal(6, n);

  await hasNext(t, it2, 2);
  t.equal(6, n);
  await hasNext(t, it2, 3);
  t.equal(6, n);

  await hasNext(t, it2, 4);
  t.equal(10, n);
  await hasNext(t, it1, 4);
  t.equal(10, n);

  t.end();
});

test('AsyncIterable#memoize single', async t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);
  await hasNext(t, it1, 3);
  await hasNext(t, it1, 4);
  await noNext(t, it1);

  t.end();
});

test('AsyncIterable#memoize order of operations', async t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);
  await hasNext(t, it1, 3);
  await hasNext(t, it1, 4);
  await noNext(t, it1);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  await hasNext(t, it2, 2);
  await hasNext(t, it2, 3);
  await hasNext(t, it2, 4);
  await noNext(t, it2);

  t.end();
});

test('AsyncIterable#memoize second early', async t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 3);
  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  await hasNext(t, it1, 4);
  await hasNext(t, it2, 2);
  await noNext(t, it1);

  await hasNext(t, it2, 3);
  await hasNext(t, it2, 4);
  await noNext(t, it2);

  t.end();
});

test('AsyncIterable#memoize max two readers', async t => {
  const rng = memoize(range(0, 5), 2);

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  await hasNext(t, it2, 2);

  const it3 = rng[Symbol.asyncIterator]();
  try {
    await it3.next();
  } catch (e) {
    t.assert(e != null);
  }

  t.end();
});

test('AsyncIterable#memoize concat with error', async t => {
  const error = new Error();
  const rng = memoize(concat(range(0, 2), _throw(error)));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  try {
    await it1.next();
  } catch (e) {
    t.same(error, e);
  }

  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  try {
    await it2.next();
  } catch (e) {
    t.same(error, e);
  }

  t.end();
});

function getRandom() {
  let min = 0, max = Math.pow(2, 53) - 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

async function* rand() {
  while (1) {
    yield getRandom();
  }
}

test('AsyncIterable#memoize should share effects of random', async t => {
  const rnd = memoize(take(rand(), 100));
  t.true(await every(zip(rnd, rnd, async (l, r) => l === r), async x => x));
  t.end();
});

test('AsyncIterable#memoize with selector', async t => {
  let n = 0;
  const res = await toArray(
    memoize(
      tap(range(0, 4), { next: async () => { n++; } }),
      undefined,
      xs => take(zip(xs, xs, async (l, r) => l + r), 4)
    )
  );

  t.true(await sequenceEqual(from(res), map(range(0, 4), async x => x * 2)));
  t.equal(4, n);
  t.end();
});

test('AsyncIterable#memoize limited with selector', async t => {
  let n = 0;
  const res = await toArray(
    memoize(
      tap(range(0, 4), { next: async () => { n++; } }),
      2,
      xs => take(zip(xs, xs, async (l, r) => l + r), 4)
    )
  );

  t.true(await sequenceEqual(from(res), map(range(0, 4), async x => x * 2)));
  t.equal(4, n);
  t.end();
});
