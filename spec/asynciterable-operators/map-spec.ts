import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.map]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#map single element', async ([map]) => {
  const source = of({ name: 'Frank', custId: 98088 });
  const expected = of('Frank');

  expect(await sequenceEqual(expected, map(source, x => x.name))).toBeTruthy();
});

test('AsyncIterable#map maps property', async ([map]) => {
  const source = of<any>(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 }
  );
  const expected = of('Frank', 'Bob', 'Chris', null, 'Frank');

  expect(await sequenceEqual(expected, map(source, x => x.name))).toBeTruthy();
});

test('AsyncIterable#map empty', async ([map]) => {
  expect(
    await sequenceEqual(empty<number>(), map(empty<string>(), (s, i) => s.length + i))
  ).toBeTruthy();
});

test('AsyncIterable#map map property using index', async ([map]) => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  );
  const expected = of('Frank', null, null);

  expect(
    await sequenceEqual(expected, map(source, (x, i) => (i === 0 ? x.name : null)))
  ).toBeTruthy();
});

test('AsyncIterable#map map property using index on last', async ([map]) => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 }
  );
  const expected = of(null, null, null, null, 'Frank');

  expect(
    await sequenceEqual(expected, map(source, (x, i) => (i === 4 ? x.name : null)))
  ).toBeTruthy();
});

test('AsyncIterable#map execution is deferred', async ([map]) => {
  let fnCalled = false;
  const source = of(() => {
    fnCalled = true;
    return 1;
  });

  map(source, x => x());

  expect(fnCalled).toBeFalsy();
});
