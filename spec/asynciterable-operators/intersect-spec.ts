import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.intersect]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#intersect with default comparer', async (t, [intersect]) => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = intersect(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('Iterable#intersect with custom comparer', async (t, [intersect]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = intersect(xs, ys, comparer);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, -3);
  await noNext(t, it);
  t.end();
});
