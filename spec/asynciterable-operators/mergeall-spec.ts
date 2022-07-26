import '../asynciterablehelpers';
import { of, toArray } from 'ix/asynciterable';
import { mergeAll } from 'ix/asynciterable/operators';

test('AsyncIterable#merge mergeAll behavior', async () => {
  const res = of(of(1, 2, 3), of(4, 5)).pipe(mergeAll());
  expect(await toArray(res)).toEqual([1, 2, 3, 4, 5]);
});
