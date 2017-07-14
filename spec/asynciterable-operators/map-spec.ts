import * as Ix from '../Ix';
import  * as test  from 'tape';
const { empty } = Ix.asynciterable;
const { map } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#map single element', async t => {
  const source = of({ name: 'Frank', custId: 98088 });
  const expected = of('Frank');

  t.true(await sequenceEqual(expected, map(source, x => x.name)));
  t.end();
});

test('AsyncIterable#map maps property', t => {
  const source = of<any>(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 },
  );
  const expected = of('Frank', 'Bob', 'Chris', null, 'Frank');

  t.true(sequenceEqual(expected, map(source, x => x.name)));
  t.end();
});

test('AsyncIterable#map empty', t => {
  t.true(sequenceEqual(empty<number>(), map(empty<string>(), (s, i) => s.length + i)));
  t.end();
});

test('AsyncIterable#map map property using index', async t => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  );
  const expected = of('Frank', null, null);

  t.true(await sequenceEqual(expected, map(source, (x, i) => i === 0 ? x.name : null)));
  t.end();
});

test('AsyncIterable#map map property using index on last', async t => {
  const source = of(
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 },
  );
  const expected = of(null, null, null, null, 'Frank');

  t.true(await sequenceEqual(expected, map(source, (x, i) => i === 4 ? x.name : null)));
  t.end();
});

test('AsyncIterable#map execution is deferred', async t => {
  let fnCalled = false;
  const source = of(() => { fnCalled = true; return 1; });

  map(source, x => x());

  t.false(fnCalled);
  t.end();
});
