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

test('AsyncIterable#publish starts at beginning', async (t, [publish]) => {
  let n = 0;
  const rng = publish(
    tick(async i => {
      n += i;
    })
  );

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

test('AsyncIterable#publish single', async (t, [publish]) => {
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

test('AsyncIterable#publish two interleaved', async (t, [publish]) => {
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

test('AsyncIterable#publish sequential', async (t, [publish]) => {
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

test('AsyncIterable#publish second late', async (t, [publish]) => {
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

test('AsyncIterbale#publish shared exceptions', async (t, [publish]) => {
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

test('AsyncIterable#publish with selector', async (t, [publish]) => {
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

  t.true(await sequenceEqual(from(res), map(range(0, 4), x => x * 2)));
  t.equal(4, n);
  t.end();
});
