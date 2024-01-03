import '../iterablehelpers';
import { includes } from 'ix/iterable/index.js';

test('Iterable#includes includes', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3);
  expect(ys).toBeTruthy();
});

test('Iterable#includes does not include', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 6);
  expect(ys).toBeFalsy();
});

test('Iterable#includes fromIndex hits', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3, 2);
  expect(ys).toBeTruthy();
});

test('Iterable#includes fromIndex misses', () => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 1, 2);
  expect(ys).toBeFalsy();
});
