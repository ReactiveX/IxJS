import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.last]);

test('Iterable#last empty returns undefined', (t, [last]) => {
  t.equal(last<number>([]), undefined);
  t.end();
});

test('Iterable#last no predicate returns first', (t, [last]) => {
  t.equal(last([1, 2, 3]), 3);
  t.end();
});

test('Iterable#last predicate empty returns undefined', (t, [last]) => {
  t.equal(last<number>([], () => true), undefined);
  t.end();
});

test('Iterable#last predicate hits returns value', (t, [last]) => {
  t.equal(last([1, 2, 3, 4, 5], x => x % 2 === 0), 4);
  t.end();
});

test('Iterable#last predicate misses returns undefined', (t, [last]) => {
  t.equal(last([1, 3, 5], x => x % 2 === 0), undefined);
  t.end();
});
