import '../iterablehelpers';
import { concat, of, sequenceEqual } from 'ix/iterable/index.js';

test('Iterable#concat behavior', () => {
  const res = concat([1, 2, 3], [4, 5]);
  expect(sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});
