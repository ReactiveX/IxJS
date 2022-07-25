import '../asynciterablehelpers';
import { empty, as, toSet } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#toSet non-empty', async () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = as(xs);
  const res = await toSet(ys);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#toSet empty', async () => {
  const xs = empty();
  const res = await toSet(xs);
  expect(res.size).toBe(0);
});

test('AsyncIterable#toSet trims', async () => {
  const xs = as([1, 2, 3, 3, 2, 1]);
  const ys = [1, 2, 3];
  const res = await toSet(xs);
  expect(sequenceEqual(res, ys)).toBeTruthy();
});
