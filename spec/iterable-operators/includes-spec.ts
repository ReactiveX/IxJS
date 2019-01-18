import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.includes]);

test('Iterable#includes includes', ([includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3);
  expect(ys).toBeTruthy();
});

test('Iterable#includes does not include', ([includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 6);
  expect(ys).toBeFalsy();
});

test('Iterable#includes fromIndex hits', ([includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3, 2);
  expect(ys).toBeTruthy();
});

test('Iterable#includes fromIndex misses', ([includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 1, 2);
  expect(ys).toBeFalsy();
});
