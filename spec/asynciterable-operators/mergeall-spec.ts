import '../asynciterablehelpers';
import { of, sequenceEqual } from 'ix/asynciterable';
import { mergeAll } from 'ix/asynciterable/operators';

test('AsyncIterable#merge mergeAll behavior', async () => {
  const res = of(of(1, 2, 3), of(4, 5)).pipe(mergeAll());
  expect(await sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});
