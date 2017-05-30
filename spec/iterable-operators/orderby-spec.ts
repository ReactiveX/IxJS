'use strict';

import * as test from 'tape';
import { orderBy, orderByDescending, thenBy, thenByDescending } from '../../dist/cjs/iterable/orderby';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#orderBy normal ordering', t => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 0; i < 10; i++) {
    hasNext(t, it, i);
  }

  noNext(t, it);
  t.end();
});

test('Iterable#orderBy normal ordering with thenBy throws', t => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = thenBy(orderBy(xs, x => x), () => { throw new Error(); });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#orderBy selector throws', t => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderBy(xs, () => { throw new Error(); });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#orderByDescending normal ordering', t => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = orderByDescending(xs, x => x);

  const it = ys[Symbol.iterator]();
  for (let i = 9; i >= 0; i--) {
    hasNext(t, it, i);
  }

  noNext(t, it);
  t.end();
});

test('Iterable#orderByDescending normal ordering with thenByDescending throws', t => {
  const xs = [2, 6, 1, 5, 7, 8, 9, 3, 4, 0];
  const ys = thenByDescending(orderByDescending(xs, x => x), () => { throw new Error(); });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});