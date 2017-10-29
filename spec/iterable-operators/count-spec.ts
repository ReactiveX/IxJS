import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.count]);

test('Iterable#count no predicate empty', (t, [count]) => {
  t.equal(count<number>([]), 0);
  t.end();
});

test('Iterable#count no predicate non-empty', (t, [count]) => {
  t.equal(count([1, 2, 3]), 3);
  t.end();
});

test('Iterable#count predicate empty', (t, [count]) => {
  t.equal(count<number>([], x => x < 3), 0);
  t.end();
});

test('Iterable#count predicate some', (t, [count]) => {
  t.equal(count([1, 2, 3], x => x < 3), 2);
  t.end();
});
