import { empty, isEmpty } from 'ix/iterable';

test('Iterable#isEmpty empty', () => {
  expect(isEmpty(empty<number>())).toBeTruthy();
});

test('Iterable#isEmpty not-empty', () => {
  expect(isEmpty([1])).toBeFalsy();
});
