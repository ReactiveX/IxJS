import * as Ix from '../Ix';
import * as test from 'tape-async';
const { groupJoin } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { reduce } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#groupJoin all groups have values', async t => {
  const xs = of(0, 1, 2);
  const ys = of(4, 7, 6, 2, 3, 4, 8, 9);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, '0 - 639');
  await hasNext(t, it, '1 - 474');
  await hasNext(t, it, '2 - 28');
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#groupJoin some groups have values', async t => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, '0 - 36');
  await hasNext(t, it, '1 - 4');
  await hasNext(t, it, '2 - ');
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#groupJoin left throws', async t => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#groupJoin right throws', async t => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = _throw<number>(err);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#groupJoin left selector throws', async t => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => {
      throw err;
    },
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#groupJoin right selector throws', async t => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => {
      throw err;
    },
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#groupJoin result selector eventually throws', async t => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (x, i) => {
      if (x === 1) {
        throw err;
      }
      return x + ' - ' + (await reduce(i, async (s, j) => s + j, ''));
    }
  );

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, '0 - 36');
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
