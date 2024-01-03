import '../iterablehelpers';
import { sequenceEqual, toArray } from 'ix/iterable/index.js';

test('Iterable#toArray some', () => {
  const xs = [42, 25, 39];
  const res = toArray(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#toArray empty', () => {
  const res = toArray<number>([]);
  expect(res).toHaveLength(0);
});
