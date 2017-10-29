import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.publish]);
const { concat } = Ix.iterable;
const { map } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { _throw } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;
const { zip } = Ix.iterable;
import { hasNext , noNext  } from '../iterablehelpers';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#publish starts at beginning', (t, [publish]) => {
  let n = 0;
  const rng = publish(tick(i => n += i));

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

test('Iterable#publish single', (t, [publish]) => {
  const rng = publish(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#publish two interleaved', (t, [publish]) => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  hasNext(t, it2, 0);
  hasNext(t, it1, 1);
  hasNext(t, it2, 1);
  hasNext(t, it1, 2);
  hasNext(t, it2, 2);
  hasNext(t, it1, 3);
  hasNext(t, it2, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);
  t.end();
});

test('Iterable#publish sequential', (t, [publish]) => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();

  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 0);
  hasNext(t, it2, 1);
  hasNext(t, it2, 2);
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);

  t.end();
});

test('Iterable#publish second late', (t, [publish]) => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 3);
  hasNext(t, it1, 4);
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);
  noNext(t, it1);
  noNext(t, it2);

  t.end();
});

test('Iterbale#publish shared exceptions', (t, [publish]) => {
  const error = new Error();
  const rng = publish(concat(range(0, 2), _throw<number>(error)));

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

test('Iterable#publish with selector', (t, [publish]) => {
  let n = 0;
  const res = toArray(
    publish(
      tap(range(0, 10), { next: () => n++ }),
      xs => take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  t.true(sequenceEqual(res, map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});
