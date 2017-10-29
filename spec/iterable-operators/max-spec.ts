import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.max]);

test('Itearble#max laws', (t, [max]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs), max(xs, x => x));
  t.end();
});

test('Iterable#max empty throws', (t, [max]) => {
  t.throws(() => max([]));
  t.end();
});

test('Iterable#max', (t, [max]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs), 5);
  t.end();
});

test('Iterable#max with selector empty throws', (t, [max]) => {
  t.throws(() => max([], x => x * 2));
  t.end();
});

test('Iterable#max with selector', (t, [max]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs, x => x * 2), 10);
  t.end();
});
