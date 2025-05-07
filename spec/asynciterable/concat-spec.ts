import { take } from 'ix/asynciterable/operators.js';
import '../asynciterablehelpers.js';
import { concat, of, sequenceEqual, toArray } from 'ix/asynciterable/index.js';

test('AsyncIterable#concat behavior', async () => {
  const res = concat(of(1, 2, 3), of(4, 5));
  expect(await sequenceEqual(res, of(1, 2, 3, 4, 5))).toBeTruthy();
});

test("AsyncIterable#concat doesn't execute more than necessary", async () => {
  let i = 0;

  async function* asyncGenerator() {
    i++;
    yield 1;
  }

  const res = concat(asyncGenerator(), asyncGenerator()).pipe(take(1));
  const items = await toArray(res);

  expect(items).toEqual([1]);
  // This second generator should not be started at all since the first one
  // provides enough values
  expect(i).toBe(1);
});
