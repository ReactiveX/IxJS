import * as Ix from '../Ix';
import * as test from 'tape';
const { first } = Ix.iterable;

test('Iterable#first empty returns undefined', t => {
  t.equal(first<number>([]), undefined);
  t.end();
});

test('Iterable#first no predicate returns first', t => {
  t.equal(first([1, 2, 3]), 1);
  t.end();
});

test('Iterable#first predicate empty returns undefined', t => {
  t.equal(first<number>([], () => true), undefined);
  t.end();
});

test('Iterable#first predicate hits returns value', t => {
  t.equal(first([1, 2, 3], x => x % 2 === 0), 2);
  t.end();
});

test('Iterable#first predicate misses returns undefined', t => {
  t.equal(first([1, 3, 5], x => x % 2 === 0), undefined);
  t.end();
});
