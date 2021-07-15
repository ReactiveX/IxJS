import '../asynciterablehelpers';
import { empty, of, sequenceEqual, throwError } from 'ix/asynciterable';

test('AsyncIterable#sequenceEqual sequence equals itself', async () => {
  const xs = of(1, 2, 3);

  expect(await sequenceEqual(xs, xs)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual empty sequence equals itself', async () => {
  const xs = empty();
  const ys = empty();

  expect(await sequenceEqual(xs, ys)).toBeTruthy();
});

test('AsyncIterable#sequenceEqual two different sequences not equal', async () => {
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual left longer than right not equal', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual right longer than left not equal', async () => {
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  expect(await sequenceEqual(xs, ys)).toBeFalsy();
});

test('AsyncIterable#sequenceEqual left throws', async () => {
  const err = new Error();
  const xs = throwError(err);
  const ys = of(1, 2, 3);

  await expect(sequenceEqual(xs, ys)).rejects.toThrow(err);
});

test('AsyncIterable#sequenceEqual right throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = throwError(err);

  await expect(sequenceEqual(xs, ys)).rejects.toThrow(err);
});

test('AsyncIterable#sequenceEqual with ccustom omparer sequence equals itself', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);

  expect(await sequenceEqual(xs, xs, { comparer: comparer })).toBeTruthy();
});

test('AsyncIterable#sequenceEqual with custom comparer empty sequence equals itself', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty();
  const ys = empty();

  expect(await sequenceEqual(xs, ys, { comparer: comparer })).toBeTruthy();
});

test('AsyncIterable#sequenceEqual with custom comparer two different sequences not equal', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 3, 2);

  expect(await sequenceEqual(xs, ys, { comparer: comparer })).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer left longer than right not equal', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3, 4);
  const ys = of(1, 2, 3);

  expect(await sequenceEqual(xs, ys, { comparer: comparer })).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer right longer than left not equal', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = of(1, 2, 3, 4);

  expect(await sequenceEqual(xs, ys, { comparer: comparer })).toBeFalsy();
});

test('AsyncIterable#sequenceEqual with custom comparer left throws', async () => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = throwError(err);
  const ys = of(1, 2, 3);

  await expect(sequenceEqual(xs, ys, { comparer: comparer })).rejects.toThrow(err);
});

test('AsyncIterable#sequenceEqual with custom comparer right throws', async () => {
  const err = new Error();
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, 3);
  const ys = throwError(err);

  await expect(sequenceEqual(xs, ys, { comparer: comparer })).rejects.toThrow(err);
});

test('Itearble#sequenceEqual with custom comparer should be equal', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  expect(await sequenceEqual(xs, ys, { comparer: comparer })).toBeTruthy();
});

test('Itearble#sequenceEqual with custom comparer throws', async () => {
  const err = new Error();
  const comparer = (_x: number, _y: number) => {
    throw err;
  };
  const xs = of(1, 2, -3, 4);
  const ys = of(1, -2, 3, 4);

  await expect(sequenceEqual(xs, ys, { comparer: comparer })).rejects.toThrow(err);
});
