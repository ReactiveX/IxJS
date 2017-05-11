import  * as test  from 'tape';
import { elementAt } from '../../dist/cjs/iterable/elementat';
import { first } from '../../dist/cjs/iterable/first';
import { isEmpty } from '../../dist/cjs/iterable/isempty';
import { last } from '../../dist/cjs/iterable/last';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { skip } from '../../dist/cjs/iterable/skip';
import { take } from '../../dist/cjs/iterable/take';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable::range produces correct sequence', t => {
  const rangeSequence = range(1, 100);
  let expected = 0;

  for (let item of rangeSequence) {
    expected++;
    t.equal(expected, item);
  }

  t.equal(100, expected);
  t.end();
});

test('Iterable::range toArray produce correct result', t => {
  const arr = toArray(range(1, 100));

  for (let i = 0; i < arr.length; i++) {
    t.equal(i + 1, arr[i]);
  }
  t.end();
});

test('Iterable::range not enumerated after end', t => {
  const rangeEnum = range(1, 1);

  const it = rangeEnum[Symbol.iterator]();

  t.false(it.next().done);
  t.true(it.next().done);
  t.true(it.next().done);
  t.end();
});

test('Iterable::range negative start', t => {
  const start = -5;
  const count = 1;
  const expected = [-5];

  t.true(sequenceEqual(expected, range(start, count)));
  t.end();
});

test('Iterable::range arbitrary start', t => {
  const start = 12;
  const count = 6;
  const expected = [12, 13, 14, 15, 16, 17];

  t.true(sequenceEqual(expected, range(start, count)));
  t.end();
});

test('Iterable::range take', t => {
  t.true(sequenceEqual(range(0, 10), take(range(0, 10), 10)));
  t.end();
});

test('Iterable::range take excessive', t => {
  t.true(sequenceEqual(range(0, 10), take(range(0, 10), Infinity)));
  t.end();
});

test('Iterable::range skip', t => {
  t.true(sequenceEqual(range(10, 10), skip(range(0, 20), 10)));
  t.end();
});

test('Iterable::range skip excessive', t => {
  t.true(isEmpty(skip(range(0, 10), 20)));
  t.end();
});

test('Iterable::range skip take can be only one', t => {
  t.true(sequenceEqual([1], take(range(1, 10), 1)));
  t.true(sequenceEqual([2], take(skip(range(1, 10), 1), 1)));
  t.true(sequenceEqual([3], skip(take(range(1, 10), 3), 2)));
  t.true(sequenceEqual([1], take(take(range(1, 10), 3), 1)));
  t.end();
});

test('Iterable::range elementAt', t => {
  t.equal(4, elementAt(range(0, 10), 4));
  t.end();
});

test('Iterable::range elementAt excessive', t => {
  t.equal(undefined, elementAt(range(52, 10), 100));
  t.end();
});

test('Iterable::range first', t => {
  t.equal(57, first(range(57, 1000000000)));
  t.end();
});

test('Iterable::range last', t => {
  t.equal(156, last(range(57, 100)));
  t.end();
});