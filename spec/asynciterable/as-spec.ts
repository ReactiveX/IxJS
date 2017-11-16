import * as Ix from '../Ix';
import * as test from 'tape-async';
const { as } = Ix.AsyncIterable;
const { map } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#as from non-iterable', async t => {
  const xs = {};
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, xs);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from string emits the string, not chars', async t => {
  const x = 'foo';
  const res = as(x);
  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, x);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from promise list', async t => {
  const xs: Iterable<Promise<number>> = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3)
  ];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

async function* getData(): AsyncIterable<number> {
  yield 1;
  yield 2;
  yield 3;
}

test('AsyncIterable#as from async generator', async t => {
  const xs = getData();
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from array/iterable', async t => {
  const xs = [1, 2, 3];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from array/iterable with selector', async t => {
  const xs = [1, 2, 3];
  const res = map(as(xs), async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from async generator with selector', async t => {
  const xs = getData();
  const res = map(as(xs), async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from empty array/iterable', async t => {
  const xs: number[] = [];
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from array-like', async t => {
  const xs = { length: 3 };
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from array-like with selector', async t => {
  const xs = { length: 3 };
  const res = map(as(xs), (x, i) => i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from promise', async t => {
  const xs = Promise.resolve(42);
  const res = as(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#as from promise with selector', async t => {
  const xs = Promise.resolve(42);
  const res = map(as(xs), (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});
