import '../iterablehelpers';
import { sequenceEqual } from 'ix/iterable';
import { distinctUntilChanged } from 'ix/iterable/operators';

test('Iterable#distinctUntilChanged no selector', () => {
  const res = distinctUntilChanged<number>()([1, 2, 2, 3, 3, 3, 2, 2, 1]);
  expect(sequenceEqual(res, [1, 2, 3, 2, 1])).toBeTruthy();
});

test('Iterable#distinctUntilChanged with selector', () => {
  const res = distinctUntilChanged<number>({ keySelector: (x) => Math.floor(x / 2) })([
    1,
    1,
    2,
    3,
    4,
    5,
    5,
    6,
    7,
  ]);
  expect(sequenceEqual(res, [1, 2, 4, 6])).toBeTruthy();
});
