'use strict';

import * as test  from 'tape';
import { buffer } from '../../dist/cjs/iterable/buffer';
import { every } from '../../dist/cjs/iterable/every';
import { map } from '../../dist/cjs/iterable/map';
import { repeat } from '../../dist/cjs/iterable/repeat';
import { sum } from '../../dist/cjs/iterable/sum';
import { take } from '../../dist/cjs/iterable/take';
import { tap } from '../../dist/cjs/iterable/tap';
import { toArray } from '../../dist/cjs/iterable/toarray';

test('Iterable#repeat infinite', t => {
  let i = 0;
  const xs = repeat(tap([1,2], { next: () => ++i }));

  const res = toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});

test('Iterable#repeat finite', t => {
  let i = 0;
  const xs = repeat(tap([1,2], { next: () => ++i }), 5);

  const res = toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});