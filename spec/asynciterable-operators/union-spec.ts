import { hasNext, noNext } from '../asynciterablehelpers.js';
import { union } from 'ix/asynciterable/operators/index.js';
import { of } from 'ix/asynciterable/index.js';

test('AsyncIterable#union with default comparer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = xs.pipe(union(ys));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 5);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#union with custom comparer', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = xs.pipe(union(ys, comparer));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, -3);
  await hasNext(it, 5);
  await hasNext(it, 4);
  await noNext(it);
});
