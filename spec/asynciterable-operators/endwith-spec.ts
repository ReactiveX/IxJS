import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.endWith]);
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#endWith adds to end', async (t, [endWith]) => {
  const e = range(0, 5);
  const r = endWith(e, 5, 6);
  t.true(await sequenceEqual(r, range(0, 7)));
  t.end();
});
