import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.memoize]);
const { concat } = Ix.iterable;
const { every } = Ix.iterable;
const { map } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { _throw } = Ix.iterable;
const { toArray } = Ix.iterable;
const { zip } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#memoize memoizes effects', ([memoize]) => {
  let n = 0;
  const rng = memoize(tick(i => (n += i)));

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

test('Iterable#memoize single', ([memoize]) => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.iterator]();

  hasNext(it1, 0);
  hasNext(it1, 1);
  hasNext(it1, 2);
  hasNext(it1, 3);
  hasNext(it1, 4);
  noNext(it1);
});

test('Iterable#memoize order of operations', ([memoize]) => {
  const rng = memoize(range(0, 5));

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

test('Iterable#memoize second early', ([memoize]) => {
  const rng = memoize(range(0, 5));

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

test('Iterable#memoize max two readers', ([memoize]) => {
  const rng = memoize(range(0, 5), 2);

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

test('Iterable#memoize concat with error', ([memoize]) => {
  const error = new Error();
  const rng = memoize(concat(range(0, 2), _throw(error)));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(it1, 0);
  hasNext(it1, 1);
  expect(() => it1.next()).toThrow();

  hasNext(it2, 0);
  hasNext(it2, 1);
  expect(() => it2.next()).toThrow();
});

function getRandom() {
  let min = 0,
    max = Math.pow(2, 53) - 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function* rand() {
  while (1) {
    yield getRandom();
  }
}

test('Iterable#memoize should share effects of random', ([memoize]) => {
  const rnd = memoize(take(rand(), 100));
  expect(every(zip(([l, r]) => l === r, rnd, rnd), x => x)).toBeTruthy();
});

test('Iterable#memoize with selector', ([memoize]) => {
  let n = 0;
  const res = toArray(
    memoize(tap(range(0, 4), { next: () => n++ }), undefined, xs =>
      take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  expect(sequenceEqual(res, map(range(0, 4), x => x * 2))).toBeTruthy();
  expect(4).toBe(n);
});

test('Iterable#memoize limited with selector', ([memoize]) => {
  let n = 0;
  const res = toArray(
    memoize(tap(range(0, 4), { next: () => n++ }), 2, xs => take(zip(([l, r]) => l + r, xs, xs), 4))
  );

  expect(sequenceEqual(res, map(range(0, 4), x => x * 2))).toBeTruthy();
  expect(4).toBe(n);
});
