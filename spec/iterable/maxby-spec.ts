import '../iterablehelpers';
import { empty, maxBy, sequenceEqual } from 'ix/iterable';

test('Iterable#maxBy', () => {
  const source = [3, 5, 7, 6, 4, 2];

  const res = maxBy(source, { selector: (x) => Math.floor(x / 2) });
  expect(sequenceEqual(res, [7, 6])).toBeTruthy();
});

test('Iterable#maxBy empty throws', () => {
  const source = empty();

  try {
    maxBy(source, { selector: (x) => Math.floor(x / 2) });
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
