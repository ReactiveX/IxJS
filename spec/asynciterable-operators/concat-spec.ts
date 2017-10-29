import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const testConcat = testOperator([Ix.asynciterable.concat]);
const testConcatAll = testOperator([Ix.asynciterable.concatAll]);
const { map } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { tap } = Ix.asynciterable;

testConcatAll('AsyncIterable#concat concatAll behavior', async (t, [concatAll]) => {
  const res = concatAll(of(of(1, 2, 3), of(4, 5)));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});

testConcatAll('Iterable#concat concatAll order of effects', async (t, [concatAll]) => {
  let i = 0;
  const xss = tap(map(range(0, 3), x => range(0, x + 1)), {
    next: async () => {
      ++i;
    }
  });
  const res = map(concatAll(xss), x => i + ' - ' + x);

  t.true(await sequenceEqual(res, of('1 - 0', '2 - 0', '2 - 1', '3 - 0', '3 - 1', '3 - 2')));
  t.end();
});

testConcat('AsyncIterable#concat behavior', async (t, [concat]) => {
  const res = concat(of(1, 2, 3), of(4, 5));
  t.true(await sequenceEqual(res, of(1, 2, 3, 4, 5)));
  t.end();
});
