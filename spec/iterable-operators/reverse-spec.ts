import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
const { reverse } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#reverse empty', t => {
  const xs = empty<number>();
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#revrse single element', t => {
  const xs = [42];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 42);
  noNext(t, it);
  t.end();
});

test('Iterable#reverse multiple elements', t => {
  const xs = [1, 2, 3];
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 2);
  hasNext(t, it, 1);
  noNext(t, it);
  t.end();
});

test('Iterable#reverse throws', t => {
  const xs = _throw<number>(new Error());
  const ys = reverse(xs);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
