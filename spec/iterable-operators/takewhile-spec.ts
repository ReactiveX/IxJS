import * as Ix from '../Ix';
import * as test from 'tape-async';
const { takeWhile } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#takeWhile some match', t => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#takeWhile no match', t => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => false);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Itearble#takeWhile all match', t => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => true);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#takeWhile uses index', t => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, (x, i) => i < 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#takeWhile predicate throws', t => {
  const xs = [1, 2, 3, 4];
  const ys = takeWhile(xs, () => { throw new Error(); });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
