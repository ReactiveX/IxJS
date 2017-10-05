import * as Ix from '../Ix';
import * as test from 'tape-async';
const { last } = Ix.iterable;

test('Iterable#last empty returns undefined', t => {
  t.equal(last<number>([]), undefined);
  t.end();
});

test('Iterable#last no predicate returns first', t => {
  t.equal(last([1, 2, 3]), 3);
  t.end();
});

test('Iterable#last predicate empty returns undefined', t => {
  t.equal(last<number>([], () => true), undefined);
  t.end();
});

test('Iterable#last predicate hits returns value', t => {
  t.equal(last([1, 2, 3, 4, 5], x => x % 2 === 0), 4);
  t.end();
});

test('Iterable#last predicate misses returns undefined', t => {
  t.equal(last([1, 3, 5], x => x % 2 === 0), undefined);
  t.end();
});
