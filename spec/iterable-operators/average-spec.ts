import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.average]);

test('Iterable#average empty', (t, [average]) => {
  t.throws(() => average([]));
  t.end();
});

test('Iterable#average', (t, [average]) => {
  const res = average([1, 2, 3]);
  t.equal(res, 2);
  t.end();
});

test('Iterable#average with selector empty', (t, [average]) => {
  t.throws(() => average<number>([], x => x * 2));
  t.end();
});

test('Iterable#average with selector', (t, [average]) => {
  const res = average([1, 2, 3], x => x * 2);
  t.equal(res, 4);
  t.end();
});

test('Iterable#average laws', (t, [average]) => {
  const xs = [1, 2, 3];
  t.equal(average(xs), average(xs, x => x));
  t.end();
});
