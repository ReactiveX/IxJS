import '../asynciterablehelpers';
import { range, sequenceEqual } from 'ix/asynciterable';
import { endWith } from 'ix/asynciterable/operators';

test('AsyncIterable#endWith adds to end', async () => {
  const e = range(0, 5);
  const r = e.pipe(endWith(5, 6));
  expect(await sequenceEqual(r, range(0, 7))).toBeTruthy();
});
