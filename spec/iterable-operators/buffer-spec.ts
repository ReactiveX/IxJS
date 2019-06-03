import '../iterablehelpers';
import { buffer } from 'ix/iterable/operators';
import { empty, range, sequenceEqual, toArray } from 'ix/iterable';

test('Iterable#buffer no skip non-full buffer', () => {
  const rng = range(0, 10);

  const res = rng.pipe(buffer(3)).pipe(toArray);
  expect(4).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [3, 4, 5])).toBeTruthy();
  expect(sequenceEqual(res[2], [6, 7, 8])).toBeTruthy();
  expect(sequenceEqual(res[3], [9])).toBeTruthy();
});

test('Iterable#buffer no skip all full', () => {
  const rng = range(0, 10);

  const res = rng.pipe(buffer(5)).pipe(toArray);
  expect(2).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2, 3, 4])).toBeTruthy();
  expect(sequenceEqual(res[1], [5, 6, 7, 8, 9])).toBeTruthy();
});

test('Iterable#buffer no skip empty buffer', () => {
  const rng = empty<number>();

  const res = rng.pipe(buffer(5)).pipe(toArray);
  expect(0).toBe(res.length);
});

test('Iterable#buffer skip non-full buffer', () => {
  const rng = range(0, 10);

  const res = rng.pipe(buffer(3, 2)).pipe(toArray);
  expect(5).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [2, 3, 4])).toBeTruthy();
  expect(sequenceEqual(res[2], [4, 5, 6])).toBeTruthy();
  expect(sequenceEqual(res[3], [6, 7, 8])).toBeTruthy();
  expect(sequenceEqual(res[4], [8, 9])).toBeTruthy();
});

test('Iterable#buffer skip full buffer', () => {
  const rng = range(0, 10);

  const res = rng.pipe(buffer(3, 4)).pipe(toArray);
  expect(3).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [4, 5, 6])).toBeTruthy();
  expect(sequenceEqual(res[2], [8, 9])).toBeTruthy();
});
