import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.endWith]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#endWith adds to end', (t, [endWith]) => {
  const e = range(0, 5);
  const r = endWith(e, 5, 6);
  t.true(sequenceEqual(r, range(0, 7)));
  t.end();
});
