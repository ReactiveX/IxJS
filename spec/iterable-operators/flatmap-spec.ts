import * as Ix from '../Ix';
import * as test from 'tape-async';
const { flatMap } = Ix.iterable;
const { range } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#flatMap with range', t => {
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#flatMap selector returns throw', t => {
  const err = new Error();
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => x < 3 ? range(0, x) : _throw(err));

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  t.throws(() => it.next());
  t.end();
});

test('Iterable#flatMap with error throws', t => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = flatMap(xs, x => range(0, x));

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#flatMap selector throws error', t => {
  const err = new Error();
  const xs = [1, 2, 3];
  const ys = flatMap(xs, x => {
    if (x < 3) { return range(0, x); }
    throw err;
  });

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  t.throws(() => it.next());
  t.end();
});
