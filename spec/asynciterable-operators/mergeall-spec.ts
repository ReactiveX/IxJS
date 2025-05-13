import '../asynciterablehelpers.js';
import { of, toArray } from 'ix/asynciterable/index.js';
import { mergeAll } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#merge mergeAll behavior', async () => {
  const res = of(of(1, 2, 3), of(4, 5)).pipe(mergeAll());
  expect(await toArray(res)).toEqual([1, 4, 2, 5, 3]);
});
