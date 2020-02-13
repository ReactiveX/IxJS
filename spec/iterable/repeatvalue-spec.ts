import '../iterablehelpers';
import { skip, take } from 'ix/iterable/operators';
import {
  repeatValue,
  count,
  elementAt,
  every,
  first,
  isEmpty,
  last,
  sequenceEqual,
  toArray
} from 'ix/iterable';

test('Iterable#repeatValue produce correct sequence', () => {
  const repeatSequence = repeatValue(1, 100);
  let counts = 0;

  for (const item of repeatSequence) {
    counts++;
    expect(1).toBe(item);
  }

  expect(100).toBe(counts);
});

test('Iterable#repeatValue toArray produce correct result', () => {
  const array = toArray(repeatValue(1, 100));

  expect(100).toBe(array.length);
  for (let i = 0; i < array.length; i++) {
    expect(1).toBe(array[i]);
  }
});

test('Iterable#repeatValue works with null element', () => {
  const objectInstance: null = null;
  const array = toArray(repeatValue(objectInstance, 100));

  expect(100).toBe(array.length);
  for (let i = 0; i < array.length; i++) {
    expect(null).toBe(array[i]);
  }
});

test('Iterable#repeatValue zero count leads to empty sequence', () => {
  const array = toArray(repeatValue(1, 0));
  expect(array.length).toBe(0);
});

test('Iterable#repeatValue not enumerate after end', () => {
  const repeatIterable = repeatValue(1, 1);
  const it = repeatIterable[Symbol.iterator]();

  expect(it.next().done).toBeFalsy();
  expect(it.next().done).toBeTruthy();
  expect(it.next().done).toBeTruthy();
});

test('Iterable#repeatValue same vresults repeat calls number query', () => {
  expect(sequenceEqual(repeatValue(-3, 0), repeatValue(-3, 0))).toBeTruthy();
});

test('Iterable#repeatValue same results repeat calls string query', () => {
  expect(sequenceEqual(repeatValue('SSS', 99), repeatValue('SSS', 99))).toBeTruthy();
});

test('Iterable#repeatValue count one single result', () => {
  const expected = [-15];
  expect(sequenceEqual(expected, repeatValue(-15, 1))).toBeTruthy();
});

test('Iterable#repeatValue arbitrary correct results', () => {
  const expected = [12, 12, 12, 12, 12, 12, 12, 12];
  expect(sequenceEqual(expected, repeatValue(12, 8))).toBeTruthy();
});

test('Iterable#repeatValue null', () => {
  const expected: null[] = [null, null, null, null];
  expect(sequenceEqual(expected, repeatValue(null, 4))).toBeTruthy();
});

test('Iterable#repeatValue take', () => {
  expect(sequenceEqual(repeatValue(12, 8), repeatValue(12, 12).pipe(take(8)))).toBeTruthy();
});

test('Iterable#repeatValue take excessive', () => {
  expect(sequenceEqual(repeatValue('', 4), repeatValue('', 4).pipe(take(22)))).toBeTruthy();
});

test('Iterable#repeatValue skip', () => {
  expect(sequenceEqual(repeatValue(12, 8), repeatValue(12, 12).pipe(skip(4)))).toBeTruthy();
});

test('Iterable#repeatValue skip excessive', () => {
  expect(isEmpty(repeatValue(12, 8).pipe(skip(22)))).toBeTruthy();
});

test('Iterable#repeatValue take can only be one', () => {
  expect(sequenceEqual([1], repeatValue(1, 10).pipe(take(1)))).toBeTruthy();
  expect(
    sequenceEqual(
      [1],
      repeatValue(1, 10)
        .pipe(skip(1))
        .pipe(take(1))
    )
  ).toBeTruthy();
  expect(
    sequenceEqual(
      [1],
      repeatValue(1, 10)
        .pipe(take(3))
        .pipe(take(1))
    )
  ).toBeTruthy();
});

test('Iterable#repeatValue skip none', () => {
  expect(sequenceEqual(repeatValue(12, 8), repeatValue(12, 8).pipe(skip(0)))).toBeTruthy();
});

test('Iterable#repeatValue first', () => {
  expect('test').toBe(first(repeatValue('test', 42)));
});

test('Iterable#repeatValue last', () => {
  expect('test').toBe(last(repeatValue('test', 42)));
});

test('Iterable#repeatValue elementAt', () => {
  expect('test').toBe(elementAt(repeatValue('test', 42), 13));
});

test('Iterable#repeatValue elementAt excessive', () => {
  expect(undefined).toBe(elementAt(repeatValue(3, 3), 100));
});

test('Iterable#repeatValue count', () => {
  expect(42).toBe(count(repeatValue('test', 42)));
});

test('Iterable#repeatValue infinite', () => {
  const xs = repeatValue(42).pipe(take(100));

  expect(every(xs, x => x === 42)).toBeTruthy();
  expect(count(xs)).toBe(100);
});

test('Iterable#repeatValue count', () => {
  const xs = repeatValue(42, 100);

  expect(every(xs, x => x === 42)).toBeTruthy();
  expect(count(xs)).toBe(100);
});
