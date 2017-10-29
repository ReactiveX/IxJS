import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const testConcat = testOperator([Ix.iterable.concat]);
const testConcatAll = testOperator([Ix.iterable.concatAll]);
const { map } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.iterable;

testConcatAll('Iterable#concat concatAll behavior', (t, [concatAll]) => {
  const res = concatAll([[1, 2, 3], [4, 5]]);
  t.true(sequenceEqual(res, [1, 2, 3, 4, 5]));
  t.end();
});

testConcatAll('Iterable#concat concatAll order of effects', (t, [concatAll]) => {
  let i = 0;
  const xss = tap(map(range(0, 3), x => range(0, x + 1)), { next: () => ++i });
  const res = map(concatAll(xss), x => i + ' - ' + x);

  t.true(sequenceEqual(res, [
    '1 - 0',
    '2 - 0',
    '2 - 1',
    '3 - 0',
    '3 - 1',
    '3 - 2'
  ]));
  t.end();
});

testConcat('Iterable#concat behavior', (t, [concat]) => {
  const res = concat([1, 2, 3], [4, 5]);
  t.true(sequenceEqual(res, [1, 2, 3, 4, 5]));
  t.end();
});
