import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.map]);
const { empty } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#map single element', ([map]) => {
  const source = [{ name: 'Frank', custId: 98088 }];
  const expected = ['Frank'];

  expect(sequenceEqual(expected, map(source, x => x.name))).toBeTruthy();
});

test('Iterable#map maps property', ([map]) => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 }
  ];
  const expected = ['Frank', 'Bob', 'Chris', null, 'Frank'];

  expect(sequenceEqual(expected, map(source, x => x.name))).toBeTruthy();
});

test('Iterable#map empty', ([map]) => {
  expect(sequenceEqual(empty<number>(), map(empty<string>(), (s, i) => s.length + i))).toBeTruthy();
});

test('Iterable#map map property using index', ([map]) => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  ];
  const expected = ['Frank', null, null];

  expect(sequenceEqual(expected, map(source, (x, i) => (i === 0 ? x.name : null)))).toBeTruthy();
});

test('Iterable#map map property using index on last', ([map]) => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 }
  ];
  const expected = [null, null, null, null, 'Frank'];

  expect(sequenceEqual(expected, map(source, (x, i) => (i === 4 ? x.name : null)))).toBeTruthy();
});

test('Iterable#map execution is deferred', ([map]) => {
  let fnCalled = false;
  const source = [
    () => {
      fnCalled = true;
      return 1;
    }
  ];

  map(source, x => x());

  expect(fnCalled).toBeFalsy();
});

test('Iterable#map source returns expected values', ([map]) => {
  const source = [1, 2, 3, 4, 5];
  const fn = (i: number) => i + 1;

  const query = map(source, fn);
  let index = 0;
  for (let item of query) {
    let expected = fn(source[index]);
    expect(expected).toBe(item);
    index++;
  }

  expect(source.length).toBe(index);
});
