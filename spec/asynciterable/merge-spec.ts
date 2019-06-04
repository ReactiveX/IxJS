import '../asynciterablehelpers';
import { of, merge, sequenceEqual } from 'ix/asynciterable';

test('AsyncIterable#merge behavior', async () => {
  const res = merge(of(1, 2, 3), of(4, 5));
  expect(await sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});
