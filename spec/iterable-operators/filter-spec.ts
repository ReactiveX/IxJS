import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.iterable;
const { filter } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#filter', t => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 8);
  hasNext(t, it, 4);
  hasNext(t, it, 6);
  hasNext(t, it, 2);
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});

test('Iterable#filter with index', t => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const ys = filter(xs, (x, i) => i % 2 === 0);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 8);
  hasNext(t, it, 7);
  hasNext(t, it, 6);
  hasNext(t, it, 2);
  hasNext(t, it, 0);
  noNext(t, it);
  t.end();
});

test('Iterable#filter with typeguard', t => {
  const xs = [
    new String('8'), 5,
    new String('7'), 4,
    new String('6'), 9,
    new String('2'), 1,
    new String('0')
  ];
  const ys: Iterable<String> = filter(xs, (x): x is String => x instanceof String);

  const it = ys[Symbol.iterator]();
  hasNext(t, it, new String('8'));
  hasNext(t, it, new String('7'));
  hasNext(t, it, new String('6'));
  hasNext(t, it, new String('2'));
  hasNext(t, it, new String('0'));
  noNext(t, it);
  t.end();
});

test('Iterable#filter throws part way through', t => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter(xs, x => { if (x === 4) { throw err; } return true; });

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 8);
  hasNext(t, it, 5);
  hasNext(t, it, 7);
  t.throws(() => it.next());
  t.end();
});

test('Iterable#filter with index throws part way through', t => {
  const xs = [8, 5, 7, 4, 6, 9, 2, 1, 0];
  const err = new Error();
  const ys = filter(xs, (x, i) => { if (i === 3) { throw err; } return true; });

  const it = ys[Symbol.iterator]();
  hasNext(t, it, 8);
  hasNext(t, it, 5);
  hasNext(t, it, 7);
  t.throws(() => it.next());
  t.end();
});

test('Iterable#filter with error source', t => {
  const xs = _throw<number>(new Error());
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  t.throws(() => it.next());
  t.end();
});

test('Iterable#filter with empty source', t => {
  const xs = empty<number>();
  const ys = filter(xs, x => x % 2 === 0);

  const it = ys[Symbol.iterator]();
  noNext(t, it);
  t.end();
});
