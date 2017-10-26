import * as Ix from '../Ix';
import * as test from 'tape-async';
const { from } = Ix.AsyncIterable;
const { slice } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#slice slices at zero with one item', async t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#slice slices at one with one item', async t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#slice slices at one with multiple items', async t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#slice slices at one with no end', async t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#slice slices at zero with no end', async t => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});
