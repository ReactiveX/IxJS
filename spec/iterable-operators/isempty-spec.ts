import '../iterablehelpers';
import { empty, isEmpty } from 'ix/iterable/index.js';

test('Iterable#isEmpty empty', () => {
  expect(isEmpty(empty())).toBeTruthy();
});

test('Iterable#isEmpty not-empty', () => {
  expect(isEmpty([1])).toBeFalsy();
});
