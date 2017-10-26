import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { reduce } = Ix.asynciterable;

test('Iterable#reduce no seed', async t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, (x, y, i) => x + y + i);
  t.equal(ys, 20);
  t.end();
});

test('Iterable#reduce no seed empty throws', async t => {
  const xs = empty<number>();
  try {
    await reduce(xs, (x, y, i) => x + y + i);
  } catch (e) {
    t.assert(e !== null);
  }
  t.end();
});

test('Iterable#reduce with seed', async t => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 0);
  t.end();
});

test('Iterable#reduce with seed empty', async t => {
  const xs = empty<number>();
  const ys = await reduce(xs, (x, y, i) => x - y - i, 20);
  t.equal(ys, 20);
  t.end();
});
