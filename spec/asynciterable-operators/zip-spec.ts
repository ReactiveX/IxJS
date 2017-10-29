import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.zip]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#zip equal length', async (t, [zip]) => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1 * 4);
  await hasNext(t, it, 2 * 5);
  await hasNext(t, it, 3 * 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#zip left longer', async (t, [zip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1 * 4);
  await hasNext(t, it, 2 * 5);
  await hasNext(t, it, 3 * 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#zip right longer', async (t, [zip]) => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1 * 4);
  await hasNext(t, it, 2 * 5);
  await hasNext(t, it, 3 * 6);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#zip multiple sources', async (t, [zip]) => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const zs = of(8, 9, 10);
  const res = zip(([x, y, z]) => x * y * z, xs, ys, zs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1 * 4 * 8);
  await hasNext(t, it, 2 * 5 * 9);
  await hasNext(t, it, 3 * 6 * 10);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#zip left throws', async (t, [zip]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = of(4, 5, 6);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#zip right throws', async (t, [zip]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = _throw<number>(err);
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#zip selector throws', async (t, [zip]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const res = zip(
    ([x, y]) => {
      if (x > 0) {
        throw err;
      }
      return x * y;
    },
    xs,
    ys
  );

  const it = res[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
