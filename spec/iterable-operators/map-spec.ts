import '../iterablehelpers';
import { from, empty, sequenceEqual } from 'ix/iterable';
import { map } from 'ix/iterable/operators';

test('Iterable#map single element', () => {
  const source = [{ name: 'Frank', custId: 98088 }];
  const expected = ['Frank'];

  expect(sequenceEqual(expected, from(source).pipe(map(x => x.name)))).toBeTruthy();
});

test('Iterable#map maps property', () => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 }
  ];
  const expected = ['Frank', 'Bob', 'Chris', null, 'Frank'];

  expect(sequenceEqual(expected, from(source).pipe(map(x => x.name)))).toBeTruthy();
});

test('Iterable#map empty', () => {
  expect(
    sequenceEqual(empty<number>(), empty<string>().pipe(map((s, i) => s.length + i)))
  ).toBeTruthy();
});

test('Iterable#map map property using index', () => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  ];
  const expected = ['Frank', null, null];

  expect(
    sequenceEqual(expected, from(source).pipe(map((x, i) => (i === 0 ? x.name : null))))
  ).toBeTruthy();
});

test('Iterable#map map property using index on last', () => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 }
  ];
  const expected = [null, null, null, null, 'Frank'];

  expect(
    sequenceEqual(expected, from(source).pipe(map((x, i) => (i === 4 ? x.name : null))))
  ).toBeTruthy();
});

test('Iterable#map execution is deferred', () => {
  let fnCalled = false;
  const source = [
    () => {
      fnCalled = true;
      return 1;
    }
  ];

  from(source).pipe(map(x => x()));

  expect(fnCalled).toBeFalsy();
});

test('Iterable#map source returns expected values', () => {
  const source = [1, 2, 3, 4, 5];
  const fn = (i: number) => i + 1;

  const query = map(fn)(source);
  let index = 0;
  for (const item of query) {
    const expected = fn(source[index]);
    expect(expected).toBe(item);
    index++;
  }

  expect(source.length).toBe(index);
});
