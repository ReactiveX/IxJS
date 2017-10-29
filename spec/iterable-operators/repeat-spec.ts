import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.repeat]);
const { buffer } = Ix.iterable;
const { every } = Ix.iterable;
const { map } = Ix.iterable;
const { sum } = Ix.iterable;
const { take } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#repeat infinite', (t, [repeat]) => {
  let i = 0;
  const xs = repeat(tap([1,2], { next: () => ++i }));

  const res = toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});

test('Iterable#repeat finite', (t, [repeat]) => {
  let i = 0;
  const xs = repeat(tap([1,2], { next: () => ++i }), 5);

  const res = toArray(take(xs, 10));
  t.equal(10, res.length);
  t.true(every(map(buffer(res, 2), b => sum(b)), x => x === 3));
  t.equal(10, i);
  t.end();
});
