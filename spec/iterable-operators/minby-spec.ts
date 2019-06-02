import { from, sequenceEqual } from 'ix/iterable';
import { minBy } from 'ix/iterable/operators';

test('Iterable#minBy', () => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = from(source).pipe(minBy(x => x % 3));
  expect(sequenceEqual(res, [0, 3, 6])).toBeTruthy();
});

test('Iterable#minBy empty throws', () => {
  const source: number[] = [];

  try {
    from(source).pipe(minBy(x => x % 3));
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
