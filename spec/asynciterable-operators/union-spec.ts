import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.union]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#union with default comparer', async ([union]) => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = union(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 5);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#union with custom comparer', async ([union]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = union(xs, ys, comparer);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, -3);
  await hasNext(it, 5);
  await hasNext(it, 4);
  await noNext(it);
});
