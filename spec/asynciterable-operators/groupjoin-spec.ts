import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.groupJoin]);
const { of } = Ix.AsyncIterable;
const { reduce } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#groupJoin all groups have values', async ([groupJoin]) => {
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
  await hasNext(it, '0 - 639');
  await hasNext(it, '1 - 474');
  await hasNext(it, '2 - 28');
  await noNext(it);
});

test('AsyncIterable#groupJoin some groups have values', async ([groupJoin]) => {
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
  await hasNext(it, '0 - 36');
  await hasNext(it, '1 - 4');
  await hasNext(it, '2 - ');
  await noNext(it);
});

test('AsyncIterable#groupJoin left throws', async ([groupJoin]) => {
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
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#groupJoin right throws', async ([groupJoin]) => {
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
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#groupJoin left selector throws', async ([groupJoin]) => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async _ => {
      throw err;
    },
    async y => y % 3,
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#groupJoin right selector throws', async ([groupJoin]) => {
  const err = new Error();
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = groupJoin(
    xs,
    ys,
    async x => x % 3,
    async _ => {
      throw err;
    },
    async (x, i) => x + ' - ' + (await reduce(i, async (s, j) => s + j, ''))
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#groupJoin result selector eventually throws', async ([groupJoin]) => {
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
  await hasNext(it, '0 - 36');
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
