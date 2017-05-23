'use strict';

import * as test from 'tape';
import { single } from '../../dist/cjs/iterable/single';

test('Iterable#single no predicate empty returns undefined', t => {
  const res = single<number>([]);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single with predicate empty returns undefined', t => {
  const res = single<number>([], () => true);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single predicate miss', t => {
  const res = single([42], x => x % 2 !== 0);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single no predicate hit', t => {
  const res = single([42]);
  t.equal(res, 42);
  t.end();
});

test('Iterable#single predicate hit', t => {
  const res = single([42], x => x % 2 === 0);
  t.equal(res, 42);
  t.end();
});

test('Iterable#single no predicate multiple throws error', t => {
  t.throws(() => single([42, 45, 90]));
  t.end();
});

test('Iterable#single with predicate multiple throws error', t => {
  t.throws(() => single([42, 45, 90], x => x % 2 === 0));
  t.end();
});