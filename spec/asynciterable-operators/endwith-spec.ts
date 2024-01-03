import '../asynciterablehelpers.js';
import { range, sequenceEqual } from 'ix/asynciterable/index.js';
import { endWith } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#endWith adds to end', async () => {
  const e = range(0, 5);
  const r = e.pipe(endWith(5, 6));
  expect(await sequenceEqual(r, range(0, 7))).toBeTruthy();
});
