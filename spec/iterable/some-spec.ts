import '../iterablehelpers';
import { some } from 'ix/iterable/index.js';

test('Iterable#some some true', () => {
  const res = some([1, 2, 3, 4], { predicate: (x) => x % 2 === 0 });
  expect(res).toBeTruthy();
});

test('Iterable#some none true', () => {
  const res = some([2, 8, 4, 6], { predicate: (x) => x % 2 !== 0 });
  expect(res).toBeFalsy();
});
