import * as Ix from '../Ix';
import * as test from 'tape';
const { empty } = Ix.asynciterable;
const { maxBy } = Ix.asynciterable;
const { of } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;

test('AsyncIterable#maxBy', async t => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await maxBy(source, async x => x % 3);
  t.true(sequenceEqual(res, of(2, 5, 2)));
  t.end();
});

test('AsyncIterable#maxBy empty throws', async t => {
  const source = empty<number>();

  try {
    await maxBy(source, async x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
