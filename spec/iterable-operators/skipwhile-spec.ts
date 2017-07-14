import * as Ix from '../Ix';
import * as test from 'tape';
const { skipWhile } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#skipWhile skips some', t => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#skipWhile skips none', t => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => false);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#skipWhile skips all', t => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => true);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#skipWhile skips some another run', t => {
  const xs = [1, 2, 3, 4, 3, 2, 1];
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  hasNext(t, it, 3);
  hasNext(t, it, 2);
  hasNext(t, it, 1);
  noNext(t, it);
  t.end();
});

test('Iterable#skipWhile predicate throws', t => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, () => { throw new Error(); });

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#skipWhile with index', t => {
  const xs = [1, 2, 3, 4];
  const ys = skipWhile(xs, (x, i) => i < 2);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});
