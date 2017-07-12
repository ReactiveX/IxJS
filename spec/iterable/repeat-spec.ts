import * as Ix from '../Ix';
import  * as test  from 'tape';
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

test('Iterable#repeat produce correct sequence', t => {
  const repeatSequence = repeatStatic(1, 100);
  let count = 0;

  for (let item of repeatSequence) {
    count++;
    t.equal(1, item);
  }

  t.equal(100, count);
  t.end();
});

test('Iterable#repeat toArray produce correct result', t => {
  const array = toArray(repeatStatic(1, 100));

  t.equal(100, array.length);
  for (let i = 0; i < array.length; i++) {
    t.equal(1, array[i]);
  }

  t.end();
});

test('Iterable#repeat works with null element', t => {
  const objectInstance: null = null;
  const array = toArray(repeatStatic(objectInstance, 100));

  t.equal(100, array.length);
  for (let i = 0; i < array.length; i++) {
    t.equal(null, array[i]);
  }

  t.end();
});

test('Iterable#repeat zero count leads to empty sequence', t => {
  const array = toArray(repeatStatic(1, 0));
  t.equal(array.length, 0);
  t.end();
});

test('Iterable#repeat not enumerate after end', t => {
  const repeatIterable = repeatStatic(1, 1);
  const it = repeatIterable[Symbol.iterator]();

  t.false(it.next().done);
  t.true(it.next().done);
  t.true(it.next().done);
  t.end();
});

test('Iterable#repeat same vresults repeat calls number query', t => {
  t.true(sequenceEqual(repeatStatic(-3, 0), repeatStatic(-3, 0)));
  t.end();
});

test('Iterable#repeat same results repeat calls string query', t => {
  t.true(sequenceEqual(repeatStatic('SSS', 99), repeatStatic('SSS', 99)));
  t.end();
});

test('Iterable#repeat count one single result', t => {
  const expected = [ -15 ];
  t.true(sequenceEqual(expected, repeatStatic(-15, 1)));
  t.end();
});

test('Iterable#repeat arbitrary correct results', t => {
  const expected = [12, 12, 12, 12, 12, 12, 12, 12];
  t.true(sequenceEqual(expected, repeatStatic(12, 8)));
  t.end();
});

test('Iterable#repeat null', t => {
  const expected: null[] = [null, null, null, null];
  t.true(sequenceEqual(expected, repeatStatic(null, 4)));
  t.end();
});

test('Iterable#repeat take', t => {
  t.true(sequenceEqual(repeatStatic(12, 8), take(repeatStatic(12, 12), 8)));
  t.end();
});

test('Iterable#repeat take excessive', t => {
  t.true(sequenceEqual(repeatStatic('', 4), take(repeatStatic('', 4), 22)));
  t.end();
});

test('Iterable#repeat skip', t => {
  t.true(sequenceEqual(repeatStatic(12, 8), skip(repeatStatic(12, 12), 4)));
  t.end();
});

test('Iterable#repeat skip excessive', t => {
  t.true(isEmpty(skip(repeatStatic(12, 8), 22)));
  t.end();
});

test('Iterable#repeat take can only be one', t => {
  t.true(sequenceEqual([1], take(repeatStatic(1, 10), 1)));
  t.true(sequenceEqual([1], take(skip(repeatStatic(1, 10), 1), 1)));
  t.true(sequenceEqual([1], take(take(repeatStatic(1, 10), 3), 1)));
  t.end();
});

test('Iterable#repeat skip none', t => {
  t.true(sequenceEqual(repeatStatic(12, 8), skip(repeatStatic(12, 8), 0)));
  t.end();
});

test('Iterable#repeat first', t => {
  t.equal('test', first(repeatStatic('test', 42)));
  t.end();
});

test('Iterable#repeat last', t => {
  t.equal('test', last(repeatStatic('test', 42)));
  t.end();
});

test('Iterable#repeat elementAt', t => {
  t.equal('test', elementAt(repeatStatic('test', 42), 13));
  t.end();
});

test('Iterable#repeat elementAt excessive', t => {
  t.equal(undefined, elementAt(repeatStatic(3, 3), 100));
  t.end();
});

test('Iterable#repeat count', t => {
  t.equal(42, count(repeatStatic('test', 42)));
  t.end();
});

test('Iterable#repeat infinite', t => {
  const xs = take(repeatStatic(42), 100);

  t.true(every(xs, x => x === 42));
  t.equal(count(xs), 100);
  t.end();
});

test('Iterable#repeat count', t => {
  const xs = repeatStatic(42, 100);

  t.true(every(xs, x => x === 42));
  t.equal(count(xs), 100);
  t.end();
});
