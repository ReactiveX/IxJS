'use strict';

import * as test from 'tape';
import { toMap } from '../../dist/cjs/iterable/tomap';

test('Iterable#toMap stores values', t => {
  const res = toMap([1, 4], x => x % 2);
  t.equal(res.get(0), 4);
  t.equal(res.get(1), 1);
  t.end();
});

test('Iterable#toMap overwrites duplicates', t => {
  const res = toMap([1, 4, 2], x => x % 2);
  t.equal(res.get(0), 2);
  t.equal(res.get(1), 1);
  t.end();
});

test('Iterable#toMap with element selector', t => {
  const res = toMap([1, 4], x => x % 2, x => x + 1);
  t.equal(res.get(0), 5);
  t.equal(res.get(1), 2);
  t.end();
});

test('Iterable#toMap with element selector overwrites duplicates', t => {
  const res = toMap([1, 4, 2], x => x % 2, x => x + 1);
  t.equal(res.get(0), 3);
  t.equal(res.get(1), 2);
  t.end();
});