import * as Ix from '../Ix';
import  * as test  from 'tape';
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
const { share } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;
const { zip } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#share single', async t => {
  const rng = share(range(0, 5));

  const it = rng[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#share shared exhausts in the beginning', async t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it2, 1);
  await hasNext(t, it1, 2);
  await hasNext(t, it2, 3);
  await hasNext(t, it1, 4);
  await noNext(t, it1);
  await noNext(t, it2);
  t.end();
});

test('AsyncIterable#share shared exhausts any time', async t => {
  const rng = share(range(0, 5));

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(t, it1, 0);
  await hasNext(t, it1, 1);
  await hasNext(t, it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(t, it2, 3);
  await hasNext(t, it2, 4);

  await noNext(t, it1);
  await noNext(t, it2);
  t.end();
});

test('AsyncIterable#share with selector', async t => {
  let n = 0;
  const res = await toArray(
    share(
      tap(range(0, 10), { next: async () => { n++;} }),
      xs => take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  t.true(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7]));
  t.equal(8, n);
  t.end();
});
