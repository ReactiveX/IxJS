'use strict';

import  * as test  from 'tape';
import { range } from '../../dist/cjs/iterable/range';
import { sequenceEqual } from '../../dist/cjs/iterable/sequenceequal';
import { share } from '../../dist/cjs/iterable/share';
import { take } from '../../dist/cjs/iterable/take';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';
import { zip } from '../../dist/cjs/iterable/zip';
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#share single', t => {
  const rng = share(range(0, 5));

  const it = rng[Symbol.iterator]();
  hasNext(t, it, 0);
  hasNext(t, it, 1);
  hasNext(t, it, 2);
  hasNext(t, it, 3);
  hasNext(t, it, 4);
  noNext(t, it);
  t.end();
});

test('Iterable#share shared exhausts in the beginning', t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  const it2 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it2, 1);
  hasNext(t, it1, 2);
  hasNext(t, it2, 3);
  hasNext(t, it1, 4);
  noNext(t, it1);
  noNext(t, it2);
  t.end();
});

test('Iterable#share shared exhausts any time', t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.iterator]();
  hasNext(t, it1, 0);
  hasNext(t, it1, 1);
  hasNext(t, it1, 2);

  const it2 = rng[Symbol.iterator]();
  hasNext(t, it2, 3);
  hasNext(t, it2, 4);

  noNext(t, it1);
  noNext(t, it2);
  t.end();
});

test('Iterable#share with selector', t => {
  let n = 0;
  const res = toArray(
    share(
      tap(range(0, 10), { next: () => n++ }),
      xs => take(zip(xs, xs, (l, r) => l + r), 4)
    )
  );

  t.true(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7]));
  t.equal(10, n);
  t.end();
});