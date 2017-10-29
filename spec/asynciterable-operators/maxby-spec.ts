import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.maxBy]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#maxBy', async (t, [maxBy]) => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await maxBy(source, async x => x % 3);
  t.true(sequenceEqual(res, of(2, 5, 2)));
  t.end();
});

test('AsyncIterable#maxBy empty throws', async (t, [maxBy]) => {
  const source = empty<number>();

  try {
    await maxBy(source, async x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
