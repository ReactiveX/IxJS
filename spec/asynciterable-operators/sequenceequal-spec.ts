import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.sequenceEqual]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#sequenceEqual sequence equals itself', async (t, [sequenceEqual]) => {
  const xs = of(1, 2, 3);

  t.true(await sequenceEqual(xs, xs));
  t.end();
});

test('AsyncIterable#sequenceEqual empty sequence equals itself', async (t, [sequenceEqual]) => {
  const xs = empty<number>();
  const ys = empty<number>();

  t.true(await sequenceEqual(xs, ys));
  t.end();
});

test('AsyncIterable#sequenceEqual two different sequences not equal', async (t, [sequenceEqual]) => {
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  t.false(await sequenceEqual(xs, ys));
  t.end();
});

test('AsyncIterable#sequenceEqual left longer than right not equal', async (t, [sequenceEqual]) => {
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  t.false(await sequenceEqual(xs, ys));
  t.end();
});

test('AsyncIterable#sequenceEqual right longer than left not equal', async (t, [sequenceEqual]) => {
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  t.false(await sequenceEqual(xs, ys));
  t.end();
});

test('AsyncIterable#sequenceEqual left throws', async (t, [sequenceEqual]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = of(1, 2, 3);

  try {
    await sequenceEqual(xs, ys);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#sequenceEqual right throws', async (t, [sequenceEqual]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = _throw<number>(err);

  try {
    await sequenceEqual(xs, ys);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#sequenceEqual with ccustom omparer sequence equals itself', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);

  t.true(await sequenceEqual(xs, xs, comparer));
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer empty sequence equals itself', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty<number>();
  const ys = empty<number>();

  t.true(await sequenceEqual(xs, ys, comparer));
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer two different sequences not equal', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  t.false(await sequenceEqual(xs, ys, comparer));
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer left longer than right not equal', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  t.false(await sequenceEqual(xs, ys, comparer));
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer right longer than left not equal', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  t.false(await sequenceEqual(xs, ys, comparer));
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer left throws', async (t, [sequenceEqual]) => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = _throw<number>(err);
  const ys = of(1, 2, 3);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#sequenceEqual with custom comparer right throws', async (t, [sequenceEqual]) => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = _throw<number>(err);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('Itearble#sequenceEqual with custom comparer should be equal', async (t, [sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  t.true(await sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Itearble#sequenceEqual with custom comparer throws', async (t, [sequenceEqual]) => {
  const err = new Error();
  const comparer = (x: number, y: number) => {
    throw err;
  };
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
