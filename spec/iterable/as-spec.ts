import * as Ix from '../Ix';
const { as } = Ix.Iterable;
const { map } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#as from array/iterable', () => {
  const xs = [1, 2, 3];
  const res = as(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  noNext(it);
});

test('Iterable#as from array/iterable with selector', () => {
  const xs = [1, 2, 3];
  const res = map(as(xs), (x, i) => x + i);

  const it = res[Symbol.iterator]();
  hasNext(it, 1);
  hasNext(it, 3);
  hasNext(it, 5);
  noNext(it);
});

test('Iterable#as from empty array/iterable', () => {
  const xs: number[] = [];
  const res = as(xs);

  const it = res[Symbol.iterator]();
  noNext(it);
});

test('Iterable#as from array-like', () => {
  const xs = { length: 3 };
  const res = as(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, undefined);
  hasNext(it, undefined);
  hasNext(it, undefined);
  noNext(it);
});

test('Iterable#as from array-like with selector', () => {
  const xs = { length: 3 };
  const res = map(as(xs), (_, i) => i);

  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  noNext(it);
});

test('Iterable#as from non-iterable', () => {
  const xs = {};
  const res = as(xs);

  const it = res[Symbol.iterator]();
  hasNext(it, xs);
  noNext(it);
});

test('Iterable#as from non-iterable with selector', () => {
  const xs = {};
  const res = map(as(xs), (x, i) => [x, i]);

  const it = res[Symbol.iterator]();
  hasNext(it, [xs, 0]);
  noNext(it);
});
