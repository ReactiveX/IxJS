import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.reduce]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;

test('Iterable#reduce no seed', (t, [reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x + y + i);
  t.equal(ys, 20);
  t.end();
});

test('Iterable#reduce no seed empty throws', (t, [reduce]) => {
  const xs = empty<number>();
  t.throws(() => reduce(xs, (x, y, i) => x + y + i));
  t.end();
});

test('Iterable#reduce with seed', (t, [reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('Iterable#reduce with seed empty', (t, [reduce]) => {
  const xs = empty<number>();
  const ys = reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});
