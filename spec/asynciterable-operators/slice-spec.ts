import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.slice]);
const { from } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#slice slices at zero with one item', async ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with one item', async ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with multiple items', async ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#slice slices at one with no end', async ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 1);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#slice slices at zero with no end', async ([slice]) => {
  const xs = from([1, 2, 3, 4]);
  const ys = slice(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});
