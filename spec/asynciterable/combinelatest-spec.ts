import { hasNext, noNext } from '../asynciterablehelpers';
import { combineLatest, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#zip equal length no selector', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const zs = of(7, 8, 9);

  const res = combineLatest(xs, ys, zs);
  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6, 7])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6, 8])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeFalsy();
  expect(sequenceEqual(next.value, [3, 6, 9])).toBeTruthy();

  next = await it.next();
  expect(next.done).toBeTruthy();
});

test('AsyncIterable#zip equal length with selector', async () => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const zs = of(7, 8, 9);

  const res = combineLatest(([x, y, z]) => x + y + z, xs, ys, zs);
  const it = res[Symbol.asyncIterator]();

  await hasNext(it, 16);
  await hasNext(it, 17);
  await hasNext(it, 18);
  await noNext(it);
});
