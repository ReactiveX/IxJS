import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.innerJoin]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#innerJoin normal', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0 + 3);
  await hasNext(it, 0 + 6);
  await hasNext(it, 1 + 4);
  await noNext(it);
});

test('AsyncIterable#innerJoin reversed', async ([innerJoin]) => {
  const xs = of(3, 6, 4);
  const ys = of(0, 1, 2);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 3 + 0);
  await hasNext(it, 6 + 0);
  await hasNext(it, 4 + 1);
  await noNext(it);
});

test('AsyncIterable#innerJoin only one group matches', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0 + 3);
  await hasNext(it, 0 + 6);
  await noNext(it);
});

test('AsyncIterable#innerJoin only one group matches reversed', async ([innerJoin]) => {
  const xs = of(3, 6);
  const ys = of(0, 1, 2);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 3 + 0);
  await hasNext(it, 6 + 0);
  await noNext(it);
});

test('AsyncIterable#innerJoin left throws', async ([innerJoin]) => {
  const xs = _throw<number>(new Error());
  const ys = of(3, 6, 4);
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#innerJoin right throws', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = _throw<number>(new Error());
  const res = innerJoin(xs, ys, async x => x % 3, async y => y % 3, async (x, y) => x + y);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#innerJoin left selector throws', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async _ => {
      throw new Error();
    },
    async y => y % 3,
    async (x, y) => x + y
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#innerJoin right selector throws', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async x => x % 3,
    async _ => {
      throw new Error();
    },
    async (x, y) => x + y
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#innerJoin result selector throws', async ([innerJoin]) => {
  const xs = of(0, 1, 2);
  const ys = of(3, 6, 4);
  const res = innerJoin(
    xs,
    ys,
    async x => x % 3,
    async y => y % 3,
    async (_x, _y) => {
      throw new Error();
    }
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
