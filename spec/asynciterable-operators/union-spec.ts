import * as Ix from '../Ix';
import * as test from 'tape-async';
const { of } = Ix.asynciterable;
const { union } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#union with default comparer', async t => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = union(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#union with custom comparer', async t => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = union(xs, ys, comparer);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, -3);
  await hasNext(t, it, 5);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});
