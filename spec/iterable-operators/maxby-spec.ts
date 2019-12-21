import '../iterablehelpers';
import { from, sequenceEqual } from 'ix/iterable';
import { maxBy } from 'ix/iterable/operators';

test('Iterable#maxBy', () => {
  const source = [2, 5, 0, 7, 4, 3, 6, 2, 1];

  const res = from(source).pipe(maxBy(x => x % 3));
  expect(sequenceEqual(res, [2, 5, 2])).toBeTruthy();
});

test('Iterable#maxBy empty throws', () => {
  const source: number[] = [];

  try {
    from(source).pipe(maxBy(x => x % 3));
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
