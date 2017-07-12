import * as Ix from '../Ix';
import  * as test  from 'tape';
const { empty } = Ix.iterable;
const { map } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#map single element', t => {
  const source = [{ name: 'Frank', custId: 98088 }];
  const expected = ['Frank'];

  t.true(sequenceEqual(expected, map(source, x => x.name)));
  t.end();
});

test('Iterable#map maps property', t => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: null, custId: 30349 },
    { name: 'Frank', custId: 39030 },
  ];
  const expected = ['Frank', 'Bob', 'Chris', null, 'Frank'];

  t.true(sequenceEqual(expected, map(source, x => x.name)));
  t.end();
});

test('Iterable#map empty', t => {
  t.true(sequenceEqual(empty<number>(), map(empty<string>(), (s, i) => s.length + i)));
  t.end();
});

test('Iterable#map map property using index', t => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 }
  ];
  const expected = ['Frank', null, null];

  t.true(sequenceEqual(expected, map(source, (x, i) => i === 0 ? x.name : null)));
  t.end();
});

test('Iterable#map map property using index on last', t => {
  const source = [
    { name: 'Frank', custId: 98088 },
    { name: 'Bob', custId: 29099 },
    { name: 'Chris', custId: 39033 },
    { name: 'Bill', custId: 30349 },
    { name: 'Frank', custId: 39030 },
  ];
  const expected = [null, null, null, null, 'Frank'];

  t.true(sequenceEqual(expected, map(source, (x, i) => i === 4 ? x.name : null)));
  t.end();
});

test('Iterable#map execution is deferred', t => {
  let fnCalled = false;
  const source = [() => { fnCalled = true; return 1; }];

  map(source, x => x());

  t.false(fnCalled);
  t.end();
});

test('Iterable#map source returns expected values', t => {
  const source = [1, 2, 3, 4, 5];
  const fn = (i: number) => i + 1;

  const query = map(source, fn);
  let index = 0;
  for (let item of query) {
    let expected = fn(source[index]);
    t.equal(expected, item);
    index++;
  }

  t.equal(source.length, index);
  t.end();
});
