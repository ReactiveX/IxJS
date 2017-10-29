import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.includes]);

test('Iterable#includes includes', (t, [includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3);
  t.true(ys);
  t.end();
});

test('Iterable#includes does not include', (t, [includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 6);
  t.false(ys);
  t.end();
});

test('Iterable#includes fromIndex hits', (t, [includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 3, 2);
  t.true(ys);
  t.end();
});

test('Iterable#includes fromIndex misses', (t, [includes]) => {
  const xs = [1, 2, 3, 4, 5];
  const ys = includes(xs, 1, 2);
  t.false(ys);
  t.end();
});
