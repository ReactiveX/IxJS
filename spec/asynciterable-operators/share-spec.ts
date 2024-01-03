import { hasNext, noNext } from '../asynciterablehelpers.js';
import { share, take } from 'ix/asynciterable/operators/index.js';
import { range, toArray } from 'ix/asynciterable/index.js';
import { sequenceEqual } from 'ix/iterable/index.js';

test('AsyncIterable#share single', async () => {
  const rng = share()(range(0, 5));

  const it = rng[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#share shared exhausts in the beginning', async () => {
  const rng = range(0, 5).pipe(share());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it2, 1);
  await hasNext(it1, 2);
  await hasNext(it2, 3);
  await hasNext(it1, 4);
  await noNext(it1);
  await noNext(it2);
});

test('AsyncIterable#share shared exhausts any time', async () => {
  const rng = range(0, 5).pipe(share());

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it2, 3);
  await hasNext(it2, 4);

  await noNext(it1);
  await noNext(it2);
});

test('AsyncIterable#share shared does not interrupt', async () => {
  const rng = range(0, 5).pipe(share());

  const res1 = await rng.pipe(take(3)).pipe(toArray);
  expect(sequenceEqual(res1, [0, 1, 2])).toBe(true);

  const res2 = await toArray(rng);
  expect(sequenceEqual(res2, [3, 4])).toBe(true);
});
