import '../iterablehelpers';
import { range } from 'ix/iterable';

test('Iterable#forEach', () => {
  let n = 0;

  range(5, 3).forEach((x) => (n += x));

  expect(5 + 6 + 7).toBe(n);
});

test('Iterable#forEach with index', () => {
  let n = 0;

  range(5, 3).forEach((x, i) => (n += x * i));

  expect(5 * 0 + 6 * 1 + 7 * 2).toBe(n);
});
