import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.minBy]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#minBy', async (t, [minBy]) => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = minBy(source, async x => x % 3);
  t.true(await sequenceEqual(res, of(0, 3, 6)));
  t.end();
});

test('AsyncIterable#minBy empty throws', async (t, [minBy]) => {
  const source = empty<number>();

  try {
    await minBy(source, async x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
