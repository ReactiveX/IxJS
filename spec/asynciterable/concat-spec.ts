import { concat, of, sequenceEqual } from 'ix/asynciterable';

test('AsyncIterable#concat behavior', async () => {
  const res = concat(of(1, 2, 3), of(4, 5));
  expect(await sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});
