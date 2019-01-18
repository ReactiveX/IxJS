import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.publish]);
const { concat } = Ix.asynciterable;
const { from } = Ix.AsyncIterable;
const { map } = Ix.asynciterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;
const { zip } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

async function* tick(t: (x: number) => void | Promise<void>) {
  let i = 0;
  while (1) {
    await t(i);
    yield i++;
  }
}

test('AsyncIterable#publish starts at beginning', async ([publish]) => {
  let n = 0;
  const rng = publish(
    tick(async i => {
      n += i;
    })
  );

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

test('AsyncIterable#publish single', async ([publish]) => {
  const rng = publish(range(0, 5));

  const it = rng[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#publish two interleaved', async ([publish]) => {
  const rng = publish(range(0, 5));

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

test('AsyncIterable#publish sequential', async ([publish]) => {
  const rng = publish(range(0, 5));

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

test('AsyncIterable#publish second late', async ([publish]) => {
  const rng = publish(range(0, 5));

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

test('AsyncIterbale#publish shared exceptions', async ([publish]) => {
  const error = new Error();
  const rng = publish(concat(range(0, 2), _throw<number>(error)));

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

test('AsyncIterable#publish with selector', async ([publish]) => {
  let n = 0;
  const res = await toArray(
    publish(
      tap(range(0, 10), {
        next: async () => {
          n++;
        }
      }),
      xs => take(zip(async ([l, r]) => l + r, xs, xs), 4)
    )
  );

  expect(await sequenceEqual(from(res), map(range(0, 4), x => x * 2))).toBeTruthy();
  expect(4).toBe(n);
});
