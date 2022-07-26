import '../asynciterablehelpers';
import { empty, as, toArray } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#toArray some', async () => {
  const xs = [42, 25, 39];
  const ys = as(xs);
  const res = await toArray(ys);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('AsyncIterable#toArray empty', async () => {
  const xs = empty();
  const res = await toArray(xs);
  expect(res).toHaveLength(0);
});
