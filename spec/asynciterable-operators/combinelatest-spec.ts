import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.combineLatest]);
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#zip equal length no selector', async (t, [combineLatest]) => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const zs = of(7, 8, 9);

  const res = combineLatest(xs, ys, zs);
  const it = res[Symbol.asyncIterator]();

  let next = await it.next();
  t.false(next.done);
  t.true(sequenceEqual(next.value, [3, 6, 7]));

  next = await it.next();
  t.false(next.done);
  t.true(sequenceEqual(next.value, [3, 6, 8]));

  next = await it.next();
  t.false(next.done);
  t.true(sequenceEqual(next.value, [3, 6, 9]));

  next = await it.next();
  t.true(next.done);

  t.end();
});

test('AsyncIterable#zip equal length with selector', async (t, [combineLatest]) => {
  const xs = of(1, 2, 3);
  const ys = of(4, 5, 6);
  const zs = of(7, 8, 9);

  const res = combineLatest(([x, y, z]) => x + y + z, xs, ys, zs);
  const it = res[Symbol.asyncIterator]();

  await hasNext(t, it, 16);
  await hasNext(t, it, 17);
  await hasNext(t, it, 18);
  await noNext(t, it);
  t.end();
});
