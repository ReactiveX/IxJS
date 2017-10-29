import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.zip]);
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#zip equal length', (t, [zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip left longer', (t, [zip]) => {
  const xs = [1, 2, 3, 4];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip right longer', (t, [zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4);
  hasNext(t, it, 2 * 5);
  hasNext(t, it, 3 * 6);
  noNext(t, it);
  t.end();
});

test('Iterable#zip multiple sources', (t, [zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6, 7];
  const zs = [8, 9, 10];
  const res = zip(([x, y, z]) => x * y * z, xs, ys, zs);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1 * 4 * 8);
  hasNext(t, it, 2 * 5 * 9);
  hasNext(t, it, 3 * 6 * 10);
  noNext(t, it);
  t.end();
});

test('Iterable#zip left throws', (t, [zip]) => {
  const xs = _throw<number>(new Error());
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#zip right throws', (t, [zip]) => {
  const xs = [1, 2, 3];
  const ys = _throw<number>(new Error());
  const res = zip(([x, y]) => x * y, xs, ys);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#zip selector throws', (t, [zip]) => {
  const xs = [1, 2, 3];
  const ys = [4, 5, 6];
  const res = zip(([x, y]) => { if (x > 0) { throw new Error(); } return x * y; }, xs, ys);

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});
