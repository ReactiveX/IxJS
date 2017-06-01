'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { groupBy } from '../../dist/cjs/iterable/groupby';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#groupBy normal', t => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 }
  ];
  const ys = groupBy(xs, x => Math.floor(x.age / 10));

  const it = ys[Symbol.iterator]();
  let next = it.next();
  t.false(next.done);
  t.equal(next.value.key, 2);
  const g1 = next.value[Symbol.iterator]();
  hasNext(t, g1, xs[0]);
  hasNext(t, g1, xs[2]);
  hasNext(t, g1, xs[4]);
  hasNext(t, g1, xs[5]);
  noNext(t, g1);

  next = it.next();
  t.false(next.done);
  t.equal(next.value.key, 6);
  const g2 = next.value[Symbol.iterator]();
  hasNext(t, g2, xs[1]);
  noNext(t, g2);

  next = it.next();
  t.false(next.done);
  t.equal(next.value.key, 1);
  const g3 = next.value[Symbol.iterator]();
  hasNext(t, g3, xs[3]);
  noNext(t, g3);

  next = it.next();
  t.false(next.done);
  t.equal(next.value.key, 4);
  const g4 = next.value[Symbol.iterator]();
  hasNext(t, g4, xs[6]);
  noNext(t, g4);

  noNext(t, it);
  t.end();
});

test('Iterable#groupBy normal can get results later', t => {
  const xs = [
    { name: 'Bart', age: 27 },
    { name: 'John', age: 62 },
    { name: 'Eric', age: 27 },
    { name: 'Lisa', age: 14 },
    { name: 'Brad', age: 27 },
    { name: 'Lisa', age: 23 },
    { name: 'Eric', age: 42 }
  ];
  const ys = groupBy(xs, x => Math.floor(x.age / 10));

  const it = ys[Symbol.iterator]();
  const g1 = it.next();
  t.false(g1.done);
  t.equal(g1.value.key, 2);

  const g2 = it.next();
  t.false(g2.done);
  t.equal(g2.value.key, 6);

  const g3 = it.next();
  t.false(g3.done);
  t.equal(g3.value.key, 1);

  const g4 = it.next();
  t.false(g4.done);
  t.equal(g4.value.key, 4);

  noNext(t, it);

  const g1it = g1.value[Symbol.iterator]();
  hasNext(t, g1it, xs[0]);
  hasNext(t, g1it, xs[2]);
  hasNext(t, g1it, xs[4]);
  hasNext(t, g1it, xs[5]);
  noNext(t, g1it);

  const g2it = g2.value[Symbol.iterator]();
  hasNext(t, g2it, xs[1]);
  noNext(t, g2it);

  const g3it = g3.value[Symbol.iterator]();
  hasNext(t, g3it, xs[3]);
  noNext(t, g3it);

  const g4it = g4.value[Symbol.iterator]();
  hasNext(t, g4it, xs[6]);
  noNext(t, g4it);

  t.end();
});

test('Iterable#groupBy empty', t => {
  const xs = empty<number>();
  const ys = groupBy(xs, x => x);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#groupBy element selector', t => {
  const xs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const ys = groupBy(xs, x => x % 3, x => String.fromCharCode(97 + x));

  const it = ys[Symbol.iterator]();

  let next = it.next();
  t.false(next.done);
  const g1 = next.value;
  t.equal(g1.key, 0);
  const g1it = g1[Symbol.iterator]();
  hasNext(t, g1it, 'a');
  hasNext(t, g1it, 'd');
  hasNext(t, g1it, 'g');
  hasNext(t, g1it, 'j');
  noNext(t, g1it);

  next = it.next();
  t.false(next.done);
  const g2 = next.value;
  t.equal(g2.key, 1);
  const g2it = g2[Symbol.iterator]();
  hasNext(t, g2it, 'b');
  hasNext(t, g2it, 'e');
  hasNext(t, g2it, 'h');
  noNext(t, g2it);

  next = it.next();
  t.false(next.done);
  const g3 = next.value;
  t.equal(g3.key, 2);
  const g3it = g3[Symbol.iterator]();
  hasNext(t, g3it, 'c');
  hasNext(t, g3it, 'f');
  hasNext(t, g3it, 'i');
  noNext(t, g3it);

  noNext(t, it);

  t.end();
});