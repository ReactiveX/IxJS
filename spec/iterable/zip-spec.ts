import '../iterablehelpers';
import { sequenceEqual, throwError, zip } from 'ix/iterable';

test('Iterable#zip equal length', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(xs, ys);

  const it = res[Symbol.iterator]();
  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeTruthy();
});

test('Iterable#zip left longer', () => {
  const xs = [1, 2, 3, 4];
  const ys = [4, 5, 6];
  const res = zip(xs, ys);

  const it = res[Symbol.iterator]();

  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeTruthy();
});

test('Iterable#zip right longer', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const res = zip(xs, ys);

  const it = res[Symbol.iterator]();

  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeTruthy();
});

test('Iterable#zip multiple sources', () => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const zs = [8, 9, 10];
  const res = zip(xs, ys, zs);

  const it = res[Symbol.iterator]();

  let next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [1, 4, 8])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [2, 5, 9])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6, 10])).toBeTruthy();

  next = it.next();
  expect(next.done).toBeTruthy();
});

test('Iterable#zip left throws', () => {
  const xs = throwError(new Error());
  const ys = [4, 5, 6];
  const res = zip(xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});

test('Iterable#zip right throws', () => {
  const xs = [1, 2, 3];
  const ys = throwError(new Error());
  const res = zip(xs, ys);

  const it = res[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
