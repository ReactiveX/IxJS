import { empty, range, sequenceEqual } from 'ix/iterable';
import { take, skipLast } from 'ix/iterable/operators';

test('Iterable#skipLast empty', () => {
  const e = empty<number>();
  const r = e.pipe(skipLast(1));
  expect(sequenceEqual(r, e)).toBeTruthy();
});

test('Iterable#skipLast partial', () => {
  const e = range(0, 5);
  const r = e.pipe(skipLast(3));
  expect(sequenceEqual(r, e.pipe(take(2)))).toBeTruthy();
});
