import '../iterablehelpers';
import { endWith } from 'ix/iterable/operators/index.js';
import { range, sequenceEqual } from 'ix/iterable/index.js';

test('Iterable#endWith adds to end', () => {
  const e = range(0, 5);
  const r = endWith(5, 6)(e);
  expect(sequenceEqual(r, range(0, 7))).toBeTruthy();
});
