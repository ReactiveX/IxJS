'use strict';

import * as test from 'tape';
import { max } from '../../dist/cjs/iterable/max';

test('Itearble#max laws', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs), max(xs, x => x));
  t.end();
});

test('Iterable#max empty throws', t => {
  t.throws(() => max([]));
  t.end();
});

test('Iterable#max', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs), 5);
  t.end();
});

test('Iterable#max with selector empty throws', t => {
  t.throws(() => max([], x => x * 2));
  t.end();
});

test('Iterable#max with selector', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(max(xs, x => x * 2), 10);
  t.end();
});