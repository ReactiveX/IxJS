import  * as test  from 'tape';
import { count } from '../../dist/cjs/iterable/count';
import { elementAt } from '../../dist/cjs/iterable/elementat';
import { first } from '../../dist/cjs/iterable/first';
import { isEmpty } from '../../dist/cjs/iterable/isempty';
import { last } from '../../dist/cjs/iterable/last';
import { repeatValue } from '../../dist/cjs/iterable/repeatvalue';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { skip } from '../../dist/cjs/iterable/skip';
import { take } from '../../dist/cjs/iterable/take';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable::repeatValue produce correct sequence', t => {
  const repeatSequence = repeatValue(1, 100);
  let count = 0;

  for (let item of repeatSequence) {
    count++;
    t.equal(1, item);
  }

  t.equal(100, count);
  t.end();
});

test('Iterable::repeatValue toArray produce correct result', t => {
  const array = toArray(repeatValue(1, 100));

  t.equal(100, array.length);
  for (let i = 0; i < array.length; i++) {
    t.equal(1, array[i]);
  }

  t.end();
});

test('Iterable::repeatValue works with null element', t => {
  const objectInstance = null;
  const array = toArray(repeatValue(objectInstance, 100));

  t.equal(100, array.length);
  for (let i = 0; i < array.length; i++) {
    t.equal(null, array[i]);
  }

  t.end();
});

test('Iterable::repeatValue zero count leads to empty sequence', t => {
  const array = toArray(repeatValue(1, 0));
  t.equal(array.length, 0);
  t.end();
});

test('Iterable::repeatValue not enumerate after end', t => {
  const repeatIterable = repeatValue(1, 1);
  const it = repeatIterable[Symbol.iterator]();

  t.false(it.next().done);
  t.true(it.next().done);
  t.true(it.next().done);
  t.end();
});

test('Iterable::repeatValue same vresults repeat calls number query', t => {
  t.true(sequenceEqual(repeatValue(-3, 0), repeatValue(-3, 0)));
  t.end();
});

test('Iterable::repeatValue same results repeat calls string query', t => {
  t.true(sequenceEqual(repeatValue('SSS', 99), repeatValue('SSS', 99)));
  t.end();
});

test('Iterable::repeatValue count one single result', t => {
  const expected = [ -15 ];
  t.true(sequenceEqual(expected, repeatValue(-15, 1)));
  t.end();
});

test('Iterable::repeatValue arbitrary correct results', t => {
  const expected = [12, 12, 12, 12, 12, 12, 12, 12];
  t.true(sequenceEqual(expected, repeatValue(12, 8)));
  t.end();
});

test('Iterable::repeatValue null', t => {
  const expected = [null, null, null, null];
  t.true(sequenceEqual(expected, repeatValue(null, 4)));
  t.end();
});

test('Iterable::repeatValue take', t => {
  t.true(sequenceEqual(repeatValue(12, 8), take(repeatValue(12, 12), 8)));
  t.end();
});

test('Iterable::repeatValue take excessive', t => {
  t.true(sequenceEqual(repeatValue('', 4), take(repeatValue('', 4), 22)));
  t.end();
});

test('Iterable::repeatValue skip', t => {
  t.true(sequenceEqual(repeatValue(12, 8), skip(repeatValue(12, 12), 4)));
  t.end();
});

test('Iterable::repeatValue skip excessive', t => {
  t.true(isEmpty(skip(repeatValue(12, 8), 22)));
  t.end();
});

test('Iterable::repeatValue take can only be one', t => {
  t.true(sequenceEqual([1], take(repeatValue(1, 10), 1)));
  t.true(sequenceEqual([1], take(skip(repeatValue(1, 10), 1), 1)));
  t.true(sequenceEqual([1], take(take(repeatValue(1, 10), 3), 1)));
  t.end();
});

test('Iterable::repeatValue skip none', t => {
  t.true(sequenceEqual(repeatValue(12, 8), skip(repeatValue(12, 8), 0)));
  t.end();
})

test('Iterable::repeatValue first', t => {
  t.equal('test', first(repeatValue('test', 42)));
  t.end();
});

test('Iterable::repeatValue last', t => {
  t.equal('test', last(repeatValue('test', 42)));
  t.end();
})

test('Iterable::repeatValue elementAt', t => {
  t.equal('test', elementAt(repeatValue('test', 42), 13));
  t.end();
});

test('Iterable::repeatValue elementAt excessive', t => {
  t.equal(undefined, elementAt(repeatValue(3, 3), 100));
  t.end();
});

test('Iterable::repeatValue count', t => {
  t.equal(42, count(repeatValue('test', 42)));
  t.end();
});