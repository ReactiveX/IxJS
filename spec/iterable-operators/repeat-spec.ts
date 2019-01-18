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

test('Iterable#repeat infinite', ([repeat]) => {
  let i = 0;
  const xs = repeat(tap([1, 2], { next: () => ++i }));

  const res = toArray(take(xs, 10));
  expect(10).toBe(res.length);
  expect(every(map(buffer(res, 2), b => sum(b)), x => x === 3)).toBeTruthy();
  expect(10).toBe(i);
});

test('Iterable#repeat finite', ([repeat]) => {
  let i = 0;
  const xs = repeat(tap([1, 2], { next: () => ++i }), 5);

  const res = toArray(take(xs, 10));
  expect(10).toBe(res.length);
  expect(every(map(buffer(res, 2), b => sum(b)), x => x === 3)).toBeTruthy();
  expect(10).toBe(i);
});
