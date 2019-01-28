import { defer, range } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#defer defers side effects', async () => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  expect(0).toBe(i);

  expect(await sequenceEqual(xs, range(0, n))).toBeTruthy();
  expect(1).toBe(i);

  n = 3;
  expect(await sequenceEqual(xs, range(0, n))).toBeTruthy();
  expect(2).toBe(i);
});
