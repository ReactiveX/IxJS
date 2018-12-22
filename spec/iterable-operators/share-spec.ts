import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.share]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;
const { zip } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#share single', ([share]) => {
  const rng = share(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#share shared exhausts in the beginning', ([share]) => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it2, 1);
  hasNext(it1, 2);
  hasNext(it2, 3);
  hasNext(it1, 4);
  noNext(it1);
  noNext(it2);
});

test('Iterable#share shared exhausts any time', ([share]) => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(it2, 3);
  hasNext(it2, 4);

  noNext(it1);
  noNext(it2);
});

test('Iterable#share with selector', ([share]) => {
  let n = 0;
  const res = toArray(
    share(tap(range(0, 10), { next: () => n++ }), xs => take(zip(([l, r]) => l + r, xs, xs), 4))
  );

  expect(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7])).toBeTruthy();
  expect(8).toBe(n);
});
