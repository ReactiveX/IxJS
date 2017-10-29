import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.first]);

test('Iterable#first empty returns undefined', (t, [first]) => {
  t.equal(first<number>([]), undefined);
  t.end();
});

test('Iterable#first no predicate returns first', (t, [first]) => {
  t.equal(first([1, 2, 3]), 1);
  t.end();
});

test('Iterable#first predicate empty returns undefined', (t, [first]) => {
  t.equal(first<number>([], () => true), undefined);
  t.end();
});

test('Iterable#first predicate hits returns value', (t, [first]) => {
  t.equal(first([1, 2, 3], x => x % 2 === 0), 2);
  t.end();
});

test('Iterable#first predicate misses returns undefined', (t, [first]) => {
  t.equal(first([1, 3, 5], x => x % 2 === 0), undefined);
  t.end();
});
