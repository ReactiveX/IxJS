import * as Ix from '../Ix';
import  * as test  from 'tape';
const { concat } = Ix.iterable;
const { every } = Ix.iterable;
const { map } = Ix.iterable;
const { memoize } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { _throw } = Ix.iterable;
const { toArray } = Ix.iterable;
const { zip } = Ix.iterable;
import { hasNext  , noNext } from '../iterablehelpers';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#memoize memoizes effects', t => {
  let n = 0;
  const rng = memoize(tick(i => n += i));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  t.equal(0, n);

  hasNext(t, it1, 1);
  t.equal(1, n);

  hasNext(t, it1, 2);
  t.equal(3, n);
  hasNext(t, it2, 0);
  t.equal(3, n);

  hasNext(t, it1, 3);
  t.equal(6, n);
  hasNext(t, it2, 1);
  t.equal(6, n);

  hasNext(t, it2, 2);
  t.equal(6, n);
  hasNext(t, it2, 3);
  t.equal(6, n);

  hasNext(t, it2, 4);
  t.equal(10, n);
  hasNext(t, it1, 4);
  t.equal(10, n);

  t.end();
});

test('Iterable#memoize single', t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  noNext(t, it1);

  t.end();
});

test('Iterable#memoize order of operations', t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  noNext(t, it1);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  hasNext(t, it2, 2);
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it2);

  t.end();
});

test('Iterable#memoize second early', t => {
  const rng = memoize(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 3);
  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  hasNext(t, it1, 4);
  hasNext(t, it2, 2);
  noNext(t, it1);

  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it2);

  t.end();
});

test('Iterable#memoize max two readers', t => {
  const rng = memoize(range(0, 5), 2);

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  hasNext(t, it2, 2);

  const it3 = rng[Symbol.iterator]();
  t.throws(() => it3.next());

  t.end();
});

test('Iterable#memoize concat with error', t => {
  const error = new Error();
  const rng = memoize(concat(range(0, 2), _throw(error)));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  t.throws(() => it1.next());

  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  t.throws(() => it2.next());

  t.end();
});

function getRandom() {
  let min = 0, max = Math.pow(2, 53) - 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

function* rand() {
  while (1) {
    yield getRandom();
  }
}

test('Iterable#memoize should share effects of random', t => {
  const rnd = memoize(take(rand(), 100));
  t.true(every(zip(([l, r]) => l === r, rnd, rnd), x => x));
  t.end();
});

test('Iterable#memoize with selector', t => {
  let n = 0;
  const res = toArray(
    memoize(
      tap(range(0, 4), { next: () => n++ }),
      undefined,
      xs => take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  t.true(sequenceEqual(res, map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});

test('Iterable#memoize limited with selector', t => {
  let n = 0;
  const res = toArray(
    memoize(
      tap(range(0, 4), { next: () => n++ }),
      2,
      xs => take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  t.true(sequenceEqual(res, map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});
