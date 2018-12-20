import * as Ix from '../Ix';
const { defer } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;

test('Iterable#defer defers side effects', () => {
  let i = 0;
  let n = 5;
  const xs = defer(() => {
    i++;
    return range(0, n);
  });

  expect(0).toBe(i);

  expect(sequenceEqual(xs, range(0, n))).toBeTruthy();
  expect(1).toBe(i);

  n = 3;
  expect(sequenceEqual(xs, range(0, n))).toBeTruthy();
  expect(2).toBe(i);
});
