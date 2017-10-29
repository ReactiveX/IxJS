import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.maxBy]);
const { sequenceEqual } = Ix.iterable;

test('Iterable#maxBy', (t, [maxBy]) => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = maxBy(source, x => x % 3);
  t.true(sequenceEqual(res, [2, 5, 2]));
  t.end();
});

test('Iterable#maxBy empty throws', (t, [maxBy]) => {
  const source: number[] = [];

  try {
    maxBy(source, x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
