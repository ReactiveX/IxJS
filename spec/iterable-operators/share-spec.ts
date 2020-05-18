import { hasNext, noNext } from '../iterablehelpers';
import { share } from 'ix/iterable/operators';
import { range } from 'ix/iterable';

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
