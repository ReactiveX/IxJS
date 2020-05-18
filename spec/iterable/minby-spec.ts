import '../iterablehelpers';
import {} from 'ix/iterable';
import { from, minBy, sequenceEqual } from 'ix/iterable';

test('Iterable#minBy', () => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = minBy(from(source), { selector: (x) => x % 3 });
  expect(sequenceEqual(res, [0, 3, 6])).toBeTruthy();
});

test('Iterable#minBy empty throws', () => {
  const source: number[] = [];

  try {
    minBy(from(source), { selector: (x) => x % 3 });
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
