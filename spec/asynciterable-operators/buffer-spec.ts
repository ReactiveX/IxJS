import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.buffer]);
const { empty } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#buffer no skip non-full buffer', async ([buffer]) => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3));
  expect(4).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [3, 4, 5])).toBeTruthy();
  expect(sequenceEqual(res[2], [6, 7, 8])).toBeTruthy();
  expect(sequenceEqual(res[3], [9])).toBeTruthy();
});

test('AsyncIterable#buffer no skip all full', async ([buffer]) => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 5));
  expect(2).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2, 3, 4])).toBeTruthy();
  expect(sequenceEqual(res[1], [5, 6, 7, 8, 9])).toBeTruthy();
});

test('AsyncIterable#buffer no skip empty buffer', async ([buffer]) => {
  const rng = empty<number>();

  const res = await toArray(buffer(rng, 5));
  expect(0).toBe(res.length);
});

test('AsyncIterable#buffer skip non-full buffer', async ([buffer]) => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3, 2));
  expect(5).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [2, 3, 4])).toBeTruthy();
  expect(sequenceEqual(res[2], [4, 5, 6])).toBeTruthy();
  expect(sequenceEqual(res[3], [6, 7, 8])).toBeTruthy();
  expect(sequenceEqual(res[4], [8, 9])).toBeTruthy();
});

test('AsyncIterable#buffer skip full buffer', async ([buffer]) => {
  const rng = range(0, 10);

  const res = await toArray(buffer(rng, 3, 4));
  expect(3).toBe(res.length);

  expect(sequenceEqual(res[0], [0, 1, 2])).toBeTruthy();
  expect(sequenceEqual(res[1], [4, 5, 6])).toBeTruthy();
  expect(sequenceEqual(res[2], [8, 9])).toBeTruthy();
});
