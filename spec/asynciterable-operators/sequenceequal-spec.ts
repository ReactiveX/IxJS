import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.sequenceEqual]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#sequenceEqual sequence equals itself', async ([sequenceEqual]) => {
  const xs = of(1, 2, 3);

  expect(await sequenceEqual(xs, xs)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual empty sequence equals itself', async ([sequenceEqual]) => {
  const xs = empty<number>();
  const ys = empty<number>();

  expect(await sequenceEqual(xs, ys)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual two different sequences not equal', async ([sequenceEqual]) => {
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual left longer than right not equal', async ([sequenceEqual]) => {
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual right longer than left not equal', async ([sequenceEqual]) => {
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual left throws', async ([sequenceEqual]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = of(1, 2, 3);

  try {
    await sequenceEqual(xs, ys);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#sequenceEqual right throws', async ([sequenceEqual]) => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = _throw<number>(err);

  try {
    await sequenceEqual(xs, ys);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#sequenceEqual with ccustom omparer sequence equals itself', async ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);

  expect(await sequenceEqual(xs, xs, comparer)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual with custom comparer empty sequence equals itself', async ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty<number>();
  const ys = empty<number>();

  expect(await sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual with custom comparer two different sequences not equal', async ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  expect(await sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer left longer than right not equal', async ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  expect(await sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer right longer than left not equal', async ([
  sequenceEqual
]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  expect(await sequenceEqual(xs, ys, comparer)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer left throws', async ([sequenceEqual]) => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = _throw<number>(err);
  const ys = of(1, 2, 3);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#sequenceEqual with custom comparer right throws', async ([sequenceEqual]) => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = _throw<number>(err);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('Itearble#sequenceEqual with custom comparer should be equal', async ([sequenceEqual]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  expect(await sequenceEqual(xs, ys, comparer)).toBeTruthy();
});

test('Itearble#sequenceEqual with custom comparer throws', async ([sequenceEqual]) => {
  const err = new Error();
  const comparer = (_x: number, _y: number) => {
    throw err;
  };
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  try {
    await sequenceEqual(xs, ys, comparer);
  } catch (e) {
    expect(err).toEqual(e);
  }
});
