import { hasNext, noNext } from '../asynciterablehelpers.js';
import { as } from 'ix/asynciterable/index.js';

test('AsyncIterable#as from non-iterable', async () => {
  const xs = {};
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, xs);
  await noNext(it);
});

test('AsyncIterable#as from string emits the string, not chars', async () => {
  const x = 'foo';
  const res = as(x);
  const it = res[Symbol.asyncIterator]();
  await hasNext(it, x);
  await noNext(it);
});

test('AsyncIterable#as from promise list', async () => {
  const xs: Iterable<Promise<number>> = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

async function* getData(): AsyncIterable<number> {
  yield 1;
  yield 2;
  yield 3;
}

test('AsyncIterable#as from async generator', async () => {
  const xs = getData();
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#as from array/iterable', async () => {
  const xs = [1, 2, 3];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#as from empty array/iterable', async () => {
  const xs: number[] = [];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#as from array-like', async () => {
  const xs = { length: 3 };
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await noNext(it);
});

test('AsyncIterable#as from promise', async () => {
  const xs = Promise.resolve(42);
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});
