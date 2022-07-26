import { hasNext, noNext } from '../asynciterablehelpers';
import { of } from 'ix/asynciterable';
import { except } from 'ix/asynciterable/operators';

test('AsyncIterable#except with default comparer', async () => {
  const xs = of(1, 2, 3);
  const ys = of(3, 5, 1, 4);
  const res = xs.pipe(except(ys));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#except with custom comparer', async () => {
  const comparer = (x: number, y: number) => Math.abs(x) === Math.abs(y);
  const xs = of(1, 2, -3);
  const ys = of(3, 5, -1, 4);
  const res = xs.pipe(except(ys, comparer));

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 2);
  await noNext(it);
});
