import * as Ix from '../Ix';
import * as test from 'tape-async';
const { from } = Ix.Iterable;
const { slice } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#slice slices at zero with one item', t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0, 1);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  noNext(t, it);
  t.end();
});

test('Iterable#slice slices at one with one item', t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 1);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#slice slices at one with multiple items', t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  noNext(t, it);
  t.end();
});

test('Iterable#slice slices at one with no end', t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#slice slices at zero with no end', t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});
