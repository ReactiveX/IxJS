import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.repeat]);
const { buffer } = Ix.iterable;
const { every } = Ix.iterable;
const { map } = Ix.iterable;
const { of } = Ix.AsyncIterable;
const { sum } = Ix.iterable;
const { take } = Ix.asynciterable;
const { tap } = Ix.asynciterable;
const { toArray } = Ix.asynciterable;

test('AsyncIterable#repeat infinite', async ([repeat]) => {
  let i = 0;
  const xs = repeat(
    tap(of(1, 2), {
      next: async () => {
        ++i;
      }
    })
  );

  const res = await toArray(take(xs, 10));
  expect(10).toBe(res.length);
  expect(every(map(buffer(res, 2), b => sum(b)), x => x === 3)).toBeTruthy();
  expect(10).toBe(i);
});

test('AsyncIterable#repeat finite', async ([repeat]) => {
  let i = 0;
  const xs = repeat(
    tap(of(1, 2), {
      next: async () => {
        ++i;
      }
    }),
    5
  );

  const res = await toArray(take(xs, 10));
  expect(10).toBe(res.length);
  expect(every(map(buffer(res, 2), b => sum(b)), x => x === 3)).toBeTruthy();
  expect(10).toBe(i);
});
