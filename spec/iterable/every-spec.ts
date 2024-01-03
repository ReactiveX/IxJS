import '../iterablehelpers';
import { every } from 'ix/iterable/index.js';

test('Iterable#every some true', () => {
  const res = every([1, 2, 3, 4], { predicate: (x) => x % 2 === 0 });
  expect(res).toBeFalsy();
});

test('Iterable#very all true', () => {
  const res = every([2, 8, 4, 6], { predicate: (x) => x % 2 === 0 });
  expect(res).toBeTruthy();
});
