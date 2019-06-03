import { hasNext, noNext } from '../asynciterablehelpers';
import { share, take, tap } from 'ix/asynciterable/operators';
import { range, toArray, zip } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

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

test('AsyncIterable#share with selector', async () => {
  let n = 0;
  const res = await toArray(
    range(0, 10).pipe(
      tap({
        next: async () => {
          n++;
        }
      }),
      share(xs => zip(([l, r]) => l + r, xs, xs).pipe(take(4)))
    )
  );

  expect(sequenceEqual(res, [0 + 1, 2 + 3, 4 + 5, 6 + 7])).toBeTruthy();
  expect(8).toBe(n);
});
