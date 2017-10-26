import * as Ix from '../Ix';
import * as test from 'tape-async';
const { innerJoin } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#innerJoin normal', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0 + 3);
  await hasNext(t, it, 0 + 6);
  await hasNext(t, it, 1 + 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#innerJoin reversed', async t => {
  const xs = of(3, 6, 4);
  const ys = of(0, 1, 2);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 3 + 0);
  await hasNext(t, it, 6 + 0);
  await hasNext(t, it, 4 + 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#innerJoin only one group matches', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0 + 3);
  await hasNext(t, it, 0 + 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#innerJoin only one group matches reversed', async t => {
  const xs = of(3, 6);
  const ys = of(0, 1, 2);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 3 + 0);
  await hasNext(t, it, 6 + 0);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#innerJoin left throws', async t => {
  const xs = _throw<number>(new Error());
  const ys = of(3, 6, 4);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#innerJoin right throws', async t => {
  const xs = of(0, 1, 2);
  const ys = _throw<number>(new Error());
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#innerJoin left selector throws', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async x => {
      throw new Error();
    },
    async y => y % 3,
    async (x, y) => x + y
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#innerJoin right selector throws', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async x => x % 3,
    async y => {
      throw new Error();
    },
    async (x, y) => x + y
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#innerJoin result selector throws', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, y) => {
      throw new Error();
    }
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
