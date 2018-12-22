import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.pairwise]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#pairwise empty return empty', async ([pairwise]) => {
  const xs = empty<number>();
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#pairwise single returns empty', async ([pairwise]) => {
  const xs = of(5);
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#pairwise behavior', async ([pairwise]) => {
  const xs = of(5, 4, 3, 2, 1);
  const ys = pairwise(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, [5, 4]);
  await hasNext(it, [4, 3]);
  await hasNext(it, [3, 2]);
  await hasNext(it, [2, 1]);
  await noNext(it);
});
