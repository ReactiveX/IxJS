import * as Ix from '../Ix';
import  * as test  from 'tape';
const { minBy } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#minBy', t => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = minBy(source, x => x % 3);
  t.true(sequenceEqual(res, [0, 3, 6]));
  t.end();
});

test('Iterable#minBy empty throws', t => {
  const source: number[] = [];

  try {
    minBy(source, x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
