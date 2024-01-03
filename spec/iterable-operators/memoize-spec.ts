import { hasNext, noNext } from '../iterablehelpers.js';
import { memoize } from 'ix/iterable/operators/index.js';
import { concat, range, throwError } from 'ix/iterable/index.js';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#memoize memoizes effects', () => {
  let n = 0;
  const rng = memoize()(tick((i) => (n += i)));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  expect(0).toBe(n);

  hasNext(it1, 1);
  expect(1).toBe(n);

  hasNext(it1, 2);
  expect(3).toBe(n);
  hasNext(it2, 0);
  expect(3).toBe(n);

  hasNext(it1, 3);
  expect(6).toBe(n);
  hasNext(it2, 1);
  expect(6).toBe(n);

  hasNext(it2, 2);
  expect(6).toBe(n);
  hasNext(it2, 3);
  expect(6).toBe(n);

  hasNext(it2, 4);
  expect(10).toBe(n);
  hasNext(it1, 4);
  expect(10).toBe(n);
});

test('Iterable#memoize single', () => {
  const rng = memoize()(range(0, 5));

  const it1 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);
  hasNext(it1, 3);
  hasNext(it1, 4);
  noNext(it1);
});

test('Iterable#memoize order of operations', () => {
  const rng = memoize()(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);
  hasNext(it1, 3);
  hasNext(it1, 4);
  noNext(it1);

  const it2 = rng[Symbol.iterator]();
  hasNext(it2, 0);
  hasNext(it2, 1);
  hasNext(it2, 2);
  hasNext(it2, 3);
  hasNext(it2, 4);
  noNext(it2);
});

test('Iterable#memoize second early', () => {
  const rng = memoize()(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(it1, 3);
  hasNext(it2, 0);
  hasNext(it2, 1);
  hasNext(it1, 4);
  hasNext(it2, 2);
  noNext(it1);

  hasNext(it2, 3);
  hasNext(it2, 4);
  noNext(it2);
});

test('Iterable#memoize max two readers', () => {
  const rng = memoize(2)(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(it2, 0);
  hasNext(it2, 1);
  hasNext(it2, 2);

  const it3 = rng[Symbol.iterator]();
  expect(() => it3.next()).toThrow();
});

test('Iterable#memoize concat with error', () => {
  const error = new Error();
  const rng = concat(range(0, 2), throwError(error)).pipe(memoize());

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  expect(() => it1.next()).toThrow();

  hasNext(it2, 0);
  hasNext(it2, 1);
  expect(() => it2.next()).toThrow();
});
