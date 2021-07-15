import '../iterablehelpers';
import { empty, minBy, sequenceEqual } from 'ix/iterable';

test('Iterable#minBy', () => {
  const source = [3, 5, 7, 6, 4, 2];

  const res = minBy(source, { selector: (x) => Math.floor(x / 2) });
  expect(sequenceEqual(res, [3, 2])).toBeTruthy();
});

test('Iterable#minBy empty throws', () => {
  const source = empty();

  expect(() => minBy(source, { selector: (x) => Math.floor(x / 2) })).toThrow();
});
