'use strict';

import  * as test  from 'tape';
import { publish } from '../../dist/cjs/iterable/publish';
import { range } from '../../dist/cjs/iterable/range';
import { hasNext , noNext  } from '../iterablehelpers';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#publish starts at beginning', t => {
  let n = 0;
  const rng = publish(tick(i => n += i));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  t.equal(0, n);

  hasNext(t, it1, 1);
  t.equal(1, n);

  hasNext(t, it1, 2);
  t.equal(3, n);
  hasNext(t, it2, 0);
  t.equal(3, n);

  hasNext(t, it1, 3);
  t.equal(6, n);
  hasNext(t, it2, 1);
  t.equal(6, n);

  hasNext(t, it2, 2);
  t.equal(6, n);
  hasNext(t, it2, 3);
  t.equal(6, n);

  hasNext(t, it2, 4);
  t.equal(10, n);
  hasNext(t, it1, 4);
  t.equal(10, n);

  t.end();
});

test('Iterable#publish single', t => {
  const rng = publish(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#publish two interleaved', t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  hasNext(t, it2, 0);
  hasNext(t, it1, 1);
  hasNext(t, it2, 1);
  hasNext(t, it1, 2);
  hasNext(t, it2, 2);
  hasNext(t, it1, 3);
  hasNext(t, it2, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);
  t.end();
});

test('Iterable#publish sequential', t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  hasNext(t, it2, 2);
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);

  t.end();
});

test('Iterable#publish second late', t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);

  t.end();
});