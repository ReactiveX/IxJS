'use strict';

import  * as test  from 'tape';
import { concat } from '../../dist/cjs/iterable/concat';
import { map } from '../../dist/cjs/iterable/map';
import { publish } from '../../dist/cjs/iterable/publish';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { _throw } from '../../dist/cjs/iterable/throw';
import { take } from '../../dist/cjs/iterable/take';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';
import { zip } from '../../dist/cjs/iterable/zip';
import { hasNext , noNext  } from '../iterablehelpers';

function* tick(t: (x: number) => void) {
  let i = 0;
  while (1) {
    t(i);
    yield i++;
  }
}

test('Iterable#publish starts at beginning', t => {
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

test('Iterable#publish single', t => {
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

test('Iterable#publish two interleaved', t => {
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

test('Iterable#publish sequential', t => {
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

test('Iterable#publish second late', t => {
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

test('Iterbale#publish shared exceptions', t => {
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

test('Iterable#publish with selector', t => {
  let n = 0;
  const res = toArray(
    publish(
      tap(range(0, 10), { next: () => n++ }),
      xs => take(zip(xs, xs, (l, r) => l + r), 4)
    )
  );

  t.true(sequenceEqual(res, map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});