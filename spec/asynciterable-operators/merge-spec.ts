import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const testMerge = testOperator([Ix.asynciterable.merge]);
const testMergeAll = testOperator([Ix.asynciterable.mergeAll]);
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

testMergeAll('AsyncIterable#merge mergeAll behavior', async (t, [mergeAll]) => {
  const res = mergeAll(of(of(1, 2, 3), of(4, 5)));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});

testMerge('AsyncIterable#merge behavior', async (t, [merge]) => {
  const res = merge(of(1, 2, 3), of(4, 5));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});
