import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.except]);
const { of } = Ix.AsyncIterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('Iterable#except with default comparer', async (t, [except]) => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = except(xs, ys);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('Iterable#except with custom comparer', async (t, [except]) => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = except(xs, ys, comparer);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});
