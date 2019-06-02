import { expand, take } from 'ix/iterable/operators';
import { range, sequenceEqual } from 'ix/iterable';

test('Iterable#expand with single return behavior', () => {
  const src = expand<number>(x => [x + 1])([0]);
  const res = src.pipe(take(10));
  expect(sequenceEqual(res, range(0, 10))).toBeTruthy();
});

test('Iterable#expand with range return behavior', () => {
  const res = expand<number>(x => range(0, x))([3]);
  const exp = [3, 0, 1, 2, 0, 0, 1, 0];

  expect(sequenceEqual(res, exp)).toBeTruthy();
});
