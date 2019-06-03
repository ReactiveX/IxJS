import { hasNext, noNext } from '../iterablehelpers';
import { share, take, tap } from 'ix/iterable/operators';
import { range, sequenceEqual, toArray, zip } from 'ix/iterable';

test('Iterable#share single', () => {
  const rng = range(0, 5).pipe(share());

  const it = rng[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 2);
  hasNext(it, 3);
  hasNext(it, 4);
  noNext(it);
});

test('Iterable#share shared exhausts in the beginning', () => {
  const rng = range(0, 5).pipe(share());

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

test('Iterable#share shared exhausts any time', () => {
  const rng = range(0, 5).pipe(share());

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

test('Iterable#share with selector', () => {
  let n = 0;
  const res = range(0, 10)
    .pipe(tap({ next: () => n++ }))
    .pipe(share(xs => zip(([l, r]) => l + r, xs, xs).pipe(take(4))))
    .pipe(toArray);

  expect(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7])).toBeTruthy();
  expect(8).toBe(n);
});
