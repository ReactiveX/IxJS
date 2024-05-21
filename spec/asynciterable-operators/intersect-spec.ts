import { hasNext, noNext } from '../asynciterablehelpers.js';
import { of } from 'ix/asynciterable/index.js';
import { intersect } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#intersect with default comparer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = xs.pipe(intersect(ys));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#intersect with custom comparer', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = xs.pipe(intersect(ys, comparer));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, -3);
  await noNext(it);
});
