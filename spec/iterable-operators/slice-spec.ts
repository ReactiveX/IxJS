import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.slice]);
const { from } = Ix.Iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#slice slices at zero with one item', ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0, 1);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  noNext(it);
});

test('Iterable#slice slices at one with one item', ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 1);

  const it = ys[Symbol.iterator]();
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#slice slices at one with multiple items', ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 2);

  const it = ys[Symbol.iterator]();
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#slice slices at one with no end', ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1);

  const it = ys[Symbol.iterator]();
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#slice slices at zero with no end', ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});
