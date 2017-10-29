import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.sum]);

test('Iterable#sum laws', (t, [sum]) => {
  const xs = [1, 2, 3];
  t.equal(sum(xs), sum(xs, x => x));
  t.end();
});

test('Iterable#sum no selector empty', (t, [sum]) => {
  const xs: number[] = [];
  t.equal(sum(xs), 0);
  t.end();
});

test('#Iterable#sum no selector', (t, [sum]) => {
  const xs: number[] = [1, 2, 3];
  t.equal(sum(xs), 6);
  t.end();
});

test('Iterable#sum with selector empty', (t, [sum]) => {
  const xs: number[] = [];
  t.equal(sum(xs, x => x * 2), 0);
  t.end();
});

test('#Iterable#sum with selector', (t, [sum]) => {
  const xs: number[] = [1, 2, 3];
  t.equal(sum(xs, x => x * 2), 12);
  t.end();
});
