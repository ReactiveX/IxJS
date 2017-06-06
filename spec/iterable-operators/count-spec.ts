'use strict';

import * as test from 'tape';
import { count } from '../../dist/cjs/iterable/count';

test('Iterable#count no predicate empty', t => {
  t.equal(count<number>([]), 0);
  t.end();
});

test('Iterable#count no predicate non-empty', t => {
  t.equal(count([1, 2, 3]), 3);
  t.end();
});

test('Iterable#count predicate empty', t => {
  t.equal(count<number>([], x => x < 3), 0);
  t.end();
});

test('Iterable#count predicate some', t => {
  t.equal(count([1, 2, 3], x => x < 3), 2);
  t.end();
});