import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.share]);
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;
const { zip } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#share single', async ([share]) => {
  const rng = share(range(0, 5));

  const it = rng[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#share shared exhausts in the beginning', async ([share]) => {
  const rng = share(range(0, 5));

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

test('AsyncIterable#share shared exhausts any time', async ([share]) => {
  const rng = share(range(0, 5));

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

test('AsyncIterable#share with selector', async ([share]) => {
  let n = 0;
  const res = await toArray(
    share(
      tap(range(0, 10), {
        next: async () => {
          n++;
        }
      }),
      xs => take(zip(([l, r]) => l + r, xs, xs), 4)
    )
  );

  expect(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7])).toBeTruthy();
  expect(8).toBe(n);
});
