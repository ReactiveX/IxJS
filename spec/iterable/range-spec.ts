import * as Ix from '../Ix';
const { elementAt } = Ix.iterable;
const { first } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { last } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skip } = Ix.iterable;
const { take } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#range produces correct sequence', () => {
  const rangeSequence = range(1, 100);
  let expected = 0;

  for (let item of rangeSequence) {
    expected++;
    expect(expected).toBe(item);
  }

  expect(100).toBe(expected);
});

test('Iterable#range toArray produce correct result', () => {
  const arr = toArray(range(1, 100));

  for (let i = 0; i < arr.length; i++) {
    expect(i + 1).toBe(arr[i]);
  }
});

test('Iterable#range not enumerated after end', () => {
  const rangeEnum = range(1, 1);

  const it = rangeEnum[Symbol.iterator]();

  expect(it.next().done).toBeFalsy();
  expect(it.next().done).toBeTruthy();
  expect(it.next().done).toBeTruthy();
});

test('Iterable#range negative start', () => {
  const start = -5;
  const count = 1;
  const expected = [-5];

  expect(sequenceEqual(expected, range(start, count))).toBeTruthy();
});

test('Iterable#range arbitrary start', () => {
  const start = 12;
  const count = 6;
  const expected = [12, 13, 14, 15, 16, 17];

  expect(sequenceEqual(expected, range(start, count))).toBeTruthy();
});

test('Iterable#range take', () => {
  expect(sequenceEqual(range(0, 10), take(range(0, 10), 10))).toBeTruthy();
});

test('Iterable#range take excessive', () => {
  expect(sequenceEqual(range(0, 10), take(range(0, 10), Infinity))).toBeTruthy();
});

test('Iterable#range skip', () => {
  expect(sequenceEqual(range(10, 10), skip(range(0, 20), 10))).toBeTruthy();
});

test('Iterable#range skip excessive', () => {
  expect(isEmpty(skip(range(0, 10), 20))).toBeTruthy();
});

test('Iterable#range skip take can be only one', () => {
  expect(sequenceEqual([1], take(range(1, 10), 1))).toBeTruthy();
  expect(sequenceEqual([2], take(skip(range(1, 10), 1), 1))).toBeTruthy();
  expect(sequenceEqual([3], skip(take(range(1, 10), 3), 2))).toBeTruthy();
  expect(sequenceEqual([1], take(take(range(1, 10), 3), 1))).toBeTruthy();
});

test('Iterable#range elementAt', () => {
  expect(4).toBe(elementAt(range(0, 10), 4));
});

test('Iterable#range elementAt excessive', () => {
  expect(undefined).toBe(elementAt(range(52, 10), 100));
});

test('Iterable#range first', () => {
  expect(57).toBe(first(range(57, 1000000000)));
});

test('Iterable#range last', () => {
  expect(156).toBe(last(range(57, 100)));
});
