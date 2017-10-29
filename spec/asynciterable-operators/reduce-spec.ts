import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.reduce]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('Iterable#reduce no seed', async (t, [reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, (x, y, i) => x + y + i);
  t.equal(ys, 20);
  t.end();
});

test('Iterable#reduce no seed empty throws', async (t, [reduce]) => {
  const xs = empty<number>();
  try {
    await reduce(xs, (x, y, i) => x + y + i);
  } catch (e) {
    t.assert(e !== null);
  }
  t.end();
});

test('Iterable#reduce with seed', async (t, [reduce]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('Iterable#reduce with seed empty', async (t, [reduce]) => {
  const xs = empty<number>();
  const ys = await reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});
