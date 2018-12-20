import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.combineLatest]);
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#zip equal length no selector', async ([combineLatest]) => {
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

test('AsyncIterable#zip equal length with selector', async ([combineLatest]) => {
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
