import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.forkJoin]);
const { empty, of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#forkJoin no selector all equal', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  t.true(sequenceEqual(res as number[], [39, 42, 25]));
  t.end();
});

test('AsyncIterable#forkJoin no selector first smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  t.true(sequenceEqual(res as number[], [25, 42, 25]));
  t.end();
});

test('AsyncIterable#forkJoin no selector middle smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  t.true(sequenceEqual(res as number[], [39, 39, 25]));
  t.end();
});

test('AsyncIterable#forkJoin no selector last smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42);

  const res = await forkJoin(xs, ys, zs);
  t.true(sequenceEqual(res as number[], [39, 42, 42]));
  t.end();
});

test('AsyncIterable#forkJoin no selector first empty', async (t, [forkJoin]) => {
  const xs = empty<number>();
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#forkJoin no selector middle empty', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = empty<number>();
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#forkJoin no selector last empty', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = empty<number>();

  const res = await forkJoin(xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#forkJoin with selector all equal', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, 106);
  t.end();
});

test('AsyncIterable#forkJoin with selector first smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, 92);
  t.end();
});

test('AsyncIterable#forkJoin with selector middle smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, 103);
  t.end();
});

test('AsyncIterable#forkJoin with selector last smaller', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, 123);
  t.end();
});

test('AsyncIterable#forkJoin with selector first empty', async (t, [forkJoin]) => {
  const xs = empty<number>();
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#forkJoin with selector middle empty', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = empty<number>();
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#forkJoin with selector last empty', async (t, [forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = empty<number>();

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  t.equal(res, undefined);
  t.end();
});
