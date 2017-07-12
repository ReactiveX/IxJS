import * as Ix from '../Ix';
import * as test from 'tape';
const { take } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#take zero or less takes nothing', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, -2);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#take less than count', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});

test('Iterable#take more than count', t => {
  const xs = [1, 2, 3, 4];
  const ys = take(xs, 10);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#take throws with error', t => {
  const xs = _throw<number>(new Error());
  const ys = take(xs, 2);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
