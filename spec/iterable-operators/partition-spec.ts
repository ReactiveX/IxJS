'use strict';

import * as test from 'tape';
import { empty } from '../../dist/cjs/iterable/empty';
import { of } from '../../dist/cjs/iterable/of';
import { partition } from '../../dist/cjs/iterable/partition';
import { hasNext, noNext } from '../iterablehelpers';

function isEven(x: number) {
  return x % 2 === 0;
}

test('Iterable#partition both empty', t => {
  const xs = empty<number>();
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has left', t => {
  const xs = of(4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(t, fstIt, 4);
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has right', t => {
  const xs = of(3);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(t, sndIt, 3);
  noNext(t, sndIt);
  t.end();
});

test('Iterable#partition has both', t => {
  const xs = of(1, 2, 3, 4);
  const [fst, snd] = partition(xs, isEven);

  const fstIt = fst[Symbol.iterator]();
  hasNext(t, fstIt, 2);
  hasNext(t, fstIt, 4);
  noNext(t, fstIt);

  const sndIt = snd[Symbol.iterator]();
  hasNext(t, sndIt, 1);
  hasNext(t, sndIt, 3);
  noNext(t, sndIt);
  t.end();
});