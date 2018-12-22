import * as Ix from '../Ix';
const { count } = Ix.iterable;
const { elementAt } = Ix.iterable;
const { every } = Ix.iterable;
const { first } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { last } = Ix.iterable;
const { repeatStatic } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { skip } = Ix.iterable;
const { take } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#repeat produce correct sequence', () => {
  const repeatSequence = repeatStatic(1, 100);
  let count = 0;

  for (let item of repeatSequence) {
    count++;
    expect(1).toBe(item);
  }

  expect(100).toBe(count);
});

test('Iterable#repeat toArray produce correct result', () => {
  const array = toArray(repeatStatic(1, 100));

  expect(100).toBe(array.length);
  for (let i = 0; i < array.length; i++) {
    expect(1).toBe(array[i]);
  }
});

test('Iterable#repeat works with null element', () => {
  const objectInstance: null = null;
  const array = toArray(repeatStatic(objectInstance, 100));

  expect(100).toBe(array.length);
  for (let i = 0; i < array.length; i++) {
    expect(null).toBe(array[i]);
  }
});

test('Iterable#repeat zero count leads to empty sequence', () => {
  const array = toArray(repeatStatic(1, 0));
  expect(array.length).toBe(0);
});

test('Iterable#repeat not enumerate after end', () => {
  const repeatIterable = repeatStatic(1, 1);
  const it = repeatIterable[Symbol.iterator]();

  expect(it.next().done).toBeFalsy();
  expect(it.next().done).toBeTruthy();
  expect(it.next().done).toBeTruthy();
});

test('Iterable#repeat same vresults repeat calls number query', () => {
  expect(sequenceEqual(repeatStatic(-3, 0), repeatStatic(-3, 0))).toBeTruthy();
});

test('Iterable#repeat same results repeat calls string query', () => {
  expect(sequenceEqual(repeatStatic('SSS', 99), repeatStatic('SSS', 99))).toBeTruthy();
});

test('Iterable#repeat count one single result', () => {
  const expected = [-15];
  expect(sequenceEqual(expected, repeatStatic(-15, 1))).toBeTruthy();
});

test('Iterable#repeat arbitrary correct results', () => {
  const expected = [12, 12, 12, 12, 12, 12, 12, 12];
  expect(sequenceEqual(expected, repeatStatic(12, 8))).toBeTruthy();
});

test('Iterable#repeat null', () => {
  const expected: null[] = [null, null, null, null];
  expect(sequenceEqual(expected, repeatStatic(null, 4))).toBeTruthy();
});

test('Iterable#repeat take', () => {
  expect(sequenceEqual(repeatStatic(12, 8), take(repeatStatic(12, 12), 8))).toBeTruthy();
});

test('Iterable#repeat take excessive', () => {
  expect(sequenceEqual(repeatStatic('', 4), take(repeatStatic('', 4), 22))).toBeTruthy();
});

test('Iterable#repeat skip', () => {
  expect(sequenceEqual(repeatStatic(12, 8), skip(repeatStatic(12, 12), 4))).toBeTruthy();
});

test('Iterable#repeat skip excessive', () => {
  expect(isEmpty(skip(repeatStatic(12, 8), 22))).toBeTruthy();
});

test('Iterable#repeat take can only be one', () => {
  expect(sequenceEqual([1], take(repeatStatic(1, 10), 1))).toBeTruthy();
  expect(sequenceEqual([1], take(skip(repeatStatic(1, 10), 1), 1))).toBeTruthy();
  expect(sequenceEqual([1], take(take(repeatStatic(1, 10), 3), 1))).toBeTruthy();
});

test('Iterable#repeat skip none', () => {
  expect(sequenceEqual(repeatStatic(12, 8), skip(repeatStatic(12, 8), 0))).toBeTruthy();
});

test('Iterable#repeat first', () => {
  expect('test').toBe(first(repeatStatic('test', 42)));
});

test('Iterable#repeat last', () => {
  expect('test').toBe(last(repeatStatic('test', 42)));
});

test('Iterable#repeat elementAt', () => {
  expect('test').toBe(elementAt(repeatStatic('test', 42), 13));
});

test('Iterable#repeat elementAt excessive', () => {
  expect(undefined).toBe(elementAt(repeatStatic(3, 3), 100));
});

test('Iterable#repeat count', () => {
  expect(42).toBe(count(repeatStatic('test', 42)));
});

test('Iterable#repeat infinite', () => {
  const xs = take(repeatStatic(42), 100);

  expect(every(xs, x => x === 42)).toBeTruthy();
  expect(count(xs)).toBe(100);
});

test('Iterable#repeat count', () => {
  const xs = repeatStatic(42, 100);

  expect(every(xs, x => x === 42)).toBeTruthy();
  expect(count(xs)).toBe(100);
});
