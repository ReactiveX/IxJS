import * as Ix from '../Ix';
import * as test from 'tape';
const { zip } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#zip equal length', t => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(xs, ys, (x, y) => x * y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip left longer', t => {
  const xs = [1, 2, 3, 4];
  const ys = [4, 5, 6];
  const res = zip(xs, ys, (x, y) => x * y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip right longer', t => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const res = zip(xs, ys, (x, y) => x * y);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip left throws', t => {
  const xs = _throw<number>(new Error());
  const ys = [4, 5, 6];
  const res = zip(xs, ys, (x, y) => x * y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#zip right throws', t => {
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());
  const res = zip(xs, ys, (x, y) => x * y);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#zip selector throws', t => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(xs, ys, (x, y) => { if (x > 0) { throw new Error(); } return x * y; });

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
