'use strict';

import * as test  from 'tape';
import { buffer } from '../../dist/cjs/iterable/buffer';
import { every } from '../../dist/cjs/iterable/every';
import { map } from '../../dist/cjs/iterable/map';
import { of } from '../../dist/cjs/asynciterable/of';
import { repeat } from '../../dist/cjs/asynciterable/repeat';
import { sum } from '../../dist/cjs/iterable/sum';
import { take } from '../../dist/cjs/asynciterable/take';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { toArray } from '../../dist/cjs/asynciterable/toarray';

test('AsyncIterable#repeat infinite', async t => {
  let i = 0;
  const xs = repeat(tap(of(1,2), { next: async () => { ++i; } }));

  const res = await toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});

test('AsyncIterable#repeat finite', async t => {
  let i = 0;
  const xs = repeat(tap(of(1,2), { next: async () => { ++i; } }), 5);

  const res = await toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});