'use strict';

import  * as test  from 'tape';
import { concat } from '../../dist/cjs/asynciterable/concat';
import { from } from '../../dist/cjs/asynciterable/from';
import { map } from '../../dist/cjs/asynciterable/map';
import { publish } from '../../dist/cjs/asynciterable/publish';
import { range } from '../../dist/cjs/asynciterable/range';
import { sequenceEqual } from '../../dist/cjs/asynciterable/sequenceequal';
import { _throw } from '../../dist/cjs/asynciterable/throw';
import { take } from '../../dist/cjs/asynciterable/take';
import { tap } from '../../dist/cjs/asynciterable/tap';
import { toArray } from '../../dist/cjs/asynciterable/toarray';
import { zip } from '../../dist/cjs/asynciterable/zip';
import { hasNext , noNext  } from '../asynciterablehelpers';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#publish starts at beginning', async t => {
  let n = 0;
  const rng = publish(tick(async i => { n += i; }));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  t.equal(0, n);

  await hasNext(t, it1, 1);
  t.equal(1, n);

  await hasNext(t, it1, 2);
  t.equal(3, n);
  await hasNext(t, it2, 0);
  t.equal(3, n);

  await hasNext(t, it1, 3);
  t.equal(6, n);
  await hasNext(t, it2, 1);
  t.equal(6, n);

  await hasNext(t, it2, 2);
  t.equal(6, n);
  await hasNext(t, it2, 3);
  t.equal(6, n);

  await hasNext(t, it2, 4);
  t.equal(10, n);
  await hasNext(t, it1, 4);
  t.equal(10, n);

  t.end();
});

test('AsyncIterable#publish single', async t => {
  const rng = publish(range(0, 5));

  const it = rng[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#publish two interleaved', async t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  await hasNext(t, it2, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it2, 1);
  await hasNext(t, it1, 2);
  await hasNext(t, it2, 2);
  await hasNext(t, it1, 3);
  await hasNext(t, it2, 3);
  await hasNext(t, it1, 4);
  await hasNext(t, it2, 4);
  await noNext(t, it1);
  await noNext(t, it2);
  t.end();
});

test('AsyncIterable#publish sequential', async t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);
  await hasNext(t, it1, 3);
  await hasNext(t, it1, 4);
  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  await hasNext(t, it2, 2);
  await hasNext(t, it2, 3);
  await hasNext(t, it2, 4);
  await noNext(t, it1);
  await noNext(t, it2);

  t.end();
});

test('AsyncIterable#publish second late', async t => {
  const rng = publish(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 3);
  await hasNext(t, it1, 4);
  await hasNext(t, it2, 3);
  await hasNext(t, it2, 4);
  await noNext(t, it1);
  await noNext(t, it2);

  t.end();
});

test('AsyncIterbale#publish shared exceptions', async t => {
  const error = new Error();
  const rng = publish(concat(range(0, 2), _throw<number>(error)));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  try {
    await it1.next();
  } catch (e) {
    t.same(error, e);
  }

  await hasNext(t, it2, 0);
  await hasNext(t, it2, 1);
  try {
    await it2.next();
  } catch (e) {
    t.same(error, e);
  }

  t.end();
});

test('AsyncIterable#publish with selector', async t => {
  let n = 0;
  const res = await toArray(
    publish(
      tap(range(0, 10), { next: async () => { n++; } }),
      xs => take(zip(xs, xs, async (l, r) => l + r), 4)
    )
  );

  t.true(await sequenceEqual(from(res), map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});