import * as Ix from '../Ix';
import * as test from 'tape-async';
const { defaultIfEmpty } = Ix.iterable;
const { empty } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#defaultIfEmpty with empty', t => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});

test('Iterable#defaultIfEmpty with no empty', t => {
  const xs = [42];
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 42);
  noNext(t, it);
  t.end();
});

test('Iterable#defaultIfEmpty throws', t => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
