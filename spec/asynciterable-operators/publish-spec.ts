import { hasNext, noNext } from '../asynciterablehelpers';
import { publish } from 'ix/asynciterable/operators';
import { as, concat, range, throwError } from 'ix/asynciterable';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#publish starts at beginning', async () => {
  let n = 0;
  const rng = as(
    tick(async (i) => {
      n += i;
    })
  ).pipe(publish());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  expect(0).toBe(n);

  await hasNext(it1, 1);
  expect(1).toBe(n);

  await hasNext(it1, 2);
  expect(3).toBe(n);
  await hasNext(it2, 0);
  expect(3).toBe(n);

  await hasNext(it1, 3);
  expect(6).toBe(n);
  await hasNext(it2, 1);
  expect(6).toBe(n);

  await hasNext(it2, 2);
  expect(6).toBe(n);
  await hasNext(it2, 3);
  expect(6).toBe(n);

  await hasNext(it2, 4);
  expect(10).toBe(n);
  await hasNext(it1, 4);
  expect(10).toBe(n);
});

test('AsyncIterable#publish single', async () => {
  const rng = range(0, 5).pipe(publish());

  const it = rng[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#publish two interleaved', async () => {
  const rng = range(0, 5).pipe(publish());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  await hasNext(it2, 0);
  await hasNext(it1, 1);
  await hasNext(it2, 1);
  await hasNext(it1, 2);
  await hasNext(it2, 2);
  await hasNext(it1, 3);
  await hasNext(it2, 3);
  await hasNext(it1, 4);
  await hasNext(it2, 4);
  await noNext(it1);
  await noNext(it2);
});

test('AsyncIterable#publish sequential', async () => {
  const rng = range(0, 5).pipe(publish());

  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);
  await hasNext(it1, 3);
  await hasNext(it1, 4);
  await hasNext(it2, 0);
  await hasNext(it2, 1);
  await hasNext(it2, 2);
  await hasNext(it2, 3);
  await hasNext(it2, 4);
  await noNext(it1);
  await noNext(it2);
});

test('AsyncIterable#publish second late', async () => {
  const rng = range(0, 5).pipe(publish());

  const it1 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 0);
  await hasNext(it1, 1);
  await hasNext(it1, 2);

  const it2 = rng[Symbol.asyncIterator]();
  await hasNext(it1, 3);
  await hasNext(it1, 4);
  await hasNext(it2, 3);
  await hasNext(it2, 4);
  await noNext(it1);
  await noNext(it2);
});

test('AsyncIterbale#publish shared exceptions', async () => {
  const error = new Error();
  const rng = concat(range(0, 2), throwError(error)).pipe(publish());
  const it1 = rng[Symbol.asyncIterator]();
  const it2 = rng[Symbol.asyncIterator]();

  await hasNext(it1, 0);
  await hasNext(it1, 1);
  try {
    await it1.next();
  } catch (e) {
    expect(error).toEqual(e);
  }

  await hasNext(it2, 0);
  await hasNext(it2, 1);
  try {
    await it2.next();
  } catch (e) {
    expect(error).toEqual(e);
  }
});
