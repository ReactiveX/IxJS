import '../asynciterablehelpers.js';
import { of, range, sequenceEqual } from 'ix/asynciterable/index.js';
import { expand, take } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#expand with single return behavior', async () => {
  const res = of(0).pipe(
    expand(async (x) => of(x + 1)),
    take(10)
  );
  expect(await sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('AsyncIterable#expand with range return behavior', async () => {
  const res = of(3).pipe(expand(async (x) => range(0, x)));
  const exp = of(3, 0, 1, 2, 0, 0, 1, 0);

  expect(await sequenceEqual(res, exp)).toBeTruthy();
});
