import * as Ix from '../Ix';
import * as test from 'tape-async';
const { groupJoin } = Ix.iterable;
const { reduce } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#groupJoin all groups have values', t => {
  const xs = [0, 1, 2];
  const ys = [4, 7, 6, 2, 3, 4, 8, 9];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  hasNext(t, it, '0 - 639');
  hasNext(t, it, '1 - 474');
  hasNext(t, it, '2 - 28');
  noNext(t, it);
  t.end();
});

test('Iterable#groupJoin some groups have values', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  hasNext(t, it, '0 - 36');
  hasNext(t, it, '1 - 4');
  hasNext(t, it, '2 - ');
  noNext(t, it);
  t.end();
});

test('Iterable#groupJoin left throws', t => {
  const xs = _throw<number>(new Error());
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#groupJoin right throws', t => {
  const xs = [0, 1, 2];
  const ys = _throw<number>(new Error());
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#groupJoin left selector throws', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => { throw new Error(); },
    y => y % 3,
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#groupJoin right selector throws', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => { throw new Error(); },
    (x, i) => x + ' - ' + reduce(i, (s, j) => s + j, ''));

  const it = res[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#groupJoin result selector eventually throws', t => {
  const xs = [0, 1, 2];
  const ys = [3, 6, 4];
  const res = groupJoin(
    xs,
    ys,
    x => x % 3,
    y => y % 3,
    (x, i) => { if (x === 1) { throw new Error(); } return x + ' - ' + reduce(i, (s, j) => s + j, ''); });

  const it = res[Symbol.iterator]();
  hasNext(t, it, '0 - 36');
  t.throws(() => it.next());
  t.end();
});
