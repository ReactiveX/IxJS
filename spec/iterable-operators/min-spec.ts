'use strict';

import * as test from 'tape';
import { min } from '../../dist/cjs/iterable/min';

test('Itearble#min laws', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs), min(xs, x => x));
  t.end();
});

test('Iterable#min empty throws', t => {
  t.throws(() => min([]));
  t.end();
});

test('Iterable#min', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs), 1);
  t.end();
});

test('Iterable#min with selector empty throws', t => {
  t.throws(() => min([], x => x * 2));
  t.end();
});

test('Iterable#min with selector', t => {
  const xs = [5, 3, 1, 2, 4];
  t.equal(min(xs, x => x * 2), 2);
  t.end();
});