import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.min]);

test('Itearble#min laws', (t, [min]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs), min(xs, x => x));
  t.end();
});

test('Iterable#min empty throws', (t, [min]) => {
  t.throws(() => min([]));
  t.end();
});

test('Iterable#min', (t, [min]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs), 1);
  t.end();
});

test('Iterable#min with selector empty throws', (t, [min]) => {
  t.throws(() => min([], x => x * 2));
  t.end();
});

test('Iterable#min with selector', (t, [min]) => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs, x => x * 2), 2);
  t.end();
});
