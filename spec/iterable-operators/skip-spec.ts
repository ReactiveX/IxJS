'use strict';

import * as test from 'tape';
import { skip } from '../../dist/cjs/iterable/skip';
import { _throw } from '../../dist/cjs/iterable/throw';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#skip skips some', t => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#skip skips more than count', t => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 10);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#skip none', t => {
  const xs = [1, 2, 3, 4];
  const ys = skip(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#skip throws', t => {
  const xs = _throw<number>(new Error());
  const ys = skip(xs, 2);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});