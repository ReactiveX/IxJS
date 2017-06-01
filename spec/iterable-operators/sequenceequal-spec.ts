'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { _throw } from '../../dist/cjs/iterable/throw';

test('Iterable#sequenceEqual sequence equals itself', t => {
  const xs = [1, 2, 3];

  t.true(sequenceEqual(xs, xs));
  t.end();
});

test('Iterable#sequenceEqual empty sequence equals itself', t => {
  const xs = empty<number>();
  const ys = empty<number>();

  t.true(sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual two different sequences not equal', t => {
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  t.false(sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual left longer than right not equal', t => {
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  t.false(sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual right longer than left not equal', t => {
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  t.false(sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual left throws', t => {
  const xs = _throw<number>(new Error());
  const ys = [1, 2, 3];

  t.throws(() => sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual right throws', t => {
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());

  t.throws(() => sequenceEqual(xs, ys));
  t.end();
});

test('Iterable#sequenceEqual with ccustom omparer sequence equals itself', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];

  t.true(sequenceEqual(xs, xs, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer empty sequence equals itself', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = empty<number>();
  const ys = empty<number>();

  t.true(sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer two different sequences not equal', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 3, 2];

  t.false(sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer left longer than right not equal', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3, 4];
  const ys = [1, 2, 3];

  t.false(sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer right longer than left not equal', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = [1, 2, 3, 4];

  t.false(sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer left throws', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = _throw<number>(new Error());
  const ys = [1, 2, 3];

  t.throws(() => sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Iterable#sequenceEqual with custom comparer right throws', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());

  t.throws(() => sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Itearble#sequenceEqual with custom comparer should be equal', t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  t.true(sequenceEqual(xs, ys, comparer));
  t.end();
});

test('Itearble#sequenceEqual with custom comparer throws', t => {
  const comparer = (x: number, y: number) => { throw new Error(); }
  const xs = [1, 2, -3, 4];
  const ys = [1, -2, 3, 4];

  t.throws(() => sequenceEqual(xs, ys, comparer));
  t.end();
});