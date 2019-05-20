import { of, intersect } from 'ix/asynciterable';
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#intersect with default comparer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = intersect(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await noNext(it);
});

test('Iterable#intersect with custom comparer', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = intersect(xs, ys, comparer);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, -3);
  await noNext(it);
});
