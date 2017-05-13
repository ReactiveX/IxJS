'use strict';

import  * as test  from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { share } from '../../dist/cjs/iterable/share';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#share single', t => {
  const rng = share(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#share shared exhausts in the beginning', t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it2, 1);
  hasNext(t, it1, 2);
  hasNext(t, it2, 3);
  hasNext(t, it1, 4);
  noNext(t, it1);
  noNext(t, it2);
  t.end();
});

test('Iterable#share shared exhausts any time', t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);

  noNext(t, it1);
  noNext(t, it2);
  t.end();
});