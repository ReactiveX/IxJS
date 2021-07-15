import '../asynciterablehelpers';
import { of, throwError, zip } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#zip equal length', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const res = zip(xs, ys);

  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeTruthy();
});

test('AsyncIterable#zip left longer', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = of(4, 5, 6);
  const res = zip(xs, ys);

  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeTruthy();
});

test('AsyncIterable#zip right longer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const res = zip(xs, ys);

  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeTruthy();
});

test('AsyncIterable#zip multiple sources', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6, 7);
  const zs = of(8, 9, 10);
  const res = zip(xs, ys, zs);

  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4, 8])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5, 9])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6, 10])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeTruthy();
});

test('AsyncIterable#zip left throws', async () => {
  const err = new Error();
  const xs = throwError(err);
  const ys = of(4, 5, 6);
  const res = zip(xs, ys);

  const it = res[Symbol.asyncIterator]();

  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#zip right throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3);
  const ys = throwError(err);
  const res = zip(xs, ys);

  const it = res[Symbol.asyncIterator]();

  await expect(it.next()).rejects.toThrow(err);
});
