import * as Ix from '../Ix';
import * as test from 'tape';
const { from } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#from from array/iterable', t => {
  const xs = [1, 2, 3];
  const res = from(xs);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  noNext(t, it);
  t.end();
});

test('Iterable#from from array/iterable with selector', t => {
  const xs = [1, 2, 3];
  const res = from(xs, (x, i) => x + i);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 1);
  hasNext(t, it, 3);
  hasNext(t, it, 5);
  noNext(t, it);
  t.end();
});

test('Iterable#from from empty array/iterable', t => {
  const xs: number[] = [];
  const res = from(xs);

  const it = res[Symbol.iterator]();
  noNext(t, it);
  t.end();
});

test('Iterable#from from array-like', t => {
  const xs = { length: 3 };
  const res = from(xs);

  const it = res[Symbol.iterator]();
  hasNext(t, it, undefined);
  hasNext(t, it, undefined);
  hasNext(t, it, undefined);
  noNext(t, it);
  t.end();
});

test('Iterable#from from array-like with selector', t => {
  const xs = { length: 3 };
  const res = from(xs, (x, i) => i);

  const it = res[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  noNext(t, it);
  t.end();
});
