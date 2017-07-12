import * as Ix from '../Ix';
import  * as test  from 'tape';
const { maxBy } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#maxBy', t => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = maxBy(source, x => x % 3);
  t.true(sequenceEqual(res, [2, 5, 2]));
  t.end();
});

test('Iterable#maxBy empty throws', t => {
  const source: number[] = [];

  try {
    maxBy(source, x => x % 3);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
