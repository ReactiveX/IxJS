import '../asynciterablehelpers';
import { map } from 'ix/asynciterable/operators';
import { of, empty, sequenceEqual } from 'ix/asynciterable';

test('AsyncIterable#map single element', async () => {
  const source = of({ name: 'Frank', custId: 98088 });
  const expected = of('Frank');

  expect(await sequenceEqual(expected, source.pipe(map((x) => x.name)))).toBeTruthy();
});

test('AsyncIterable#map maps property', async () => {
  const source = of<any>(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 }
  );
  const expected = of('Frank', 'Bob', 'Chris', null, 'Frank');

  expect(await sequenceEqual(expected, source.pipe(map((x) => x.name)))).toBeTruthy();
});

test('AsyncIterable#map empty', async () => {
  expect(
    await sequenceEqual(empty(), empty().pipe(map<string, number>((s, i) => s.length + i)))
  ).toBeTruthy();
});

test('AsyncIterable#map map property using index', async () => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  );
  const expected = of('Frank', null, null);

  expect(
    await sequenceEqual(expected, source.pipe(map((x, i) => (i === 0 ? x.name : null))))
  ).toBeTruthy();
});

test('AsyncIterable#map map property using index on last', async () => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 }
  );
  const expected = of(null, null, null, null, 'Frank');

  expect(
    await sequenceEqual(expected, source.pipe(map((x, i) => (i === 4 ? x.name : null))))
  ).toBeTruthy();
});

test('AsyncIterable#map execution is deferred', async () => {
  let fnCalled = false;
  const source = of(() => {
    fnCalled = true;
    return 1;
  });

  source.pipe(map((x) => x()));

  expect(fnCalled).toBeFalsy();
});
