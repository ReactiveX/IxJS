import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.forkJoin]);
const { empty, of } = Ix.AsyncIterable;
const { sequenceEqual } = Ix.iterable;

test('AsyncIterable#forkJoin no selector all equal', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 42, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector first smaller', async ([forkJoin]) => {
  const xs = of(42, 25);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [25, 42, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector middle smaller', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 39, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector last smaller', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 42, 42])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector first empty', async ([forkJoin]) => {
  const xs = empty<number>();
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#forkJoin no selector middle empty', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = empty<number>();
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#forkJoin no selector last empty', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = empty<number>();

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#forkJoin with selector all equal', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(106);
});

test('AsyncIterable#forkJoin with selector first smaller', async ([forkJoin]) => {
  const xs = of(42, 25);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(92);
});

test('AsyncIterable#forkJoin with selector middle smaller', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(103);
});

test('AsyncIterable#forkJoin with selector last smaller', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(123);
});

test('AsyncIterable#forkJoin with selector first empty', async ([forkJoin]) => {
  const xs = empty<number>();
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#forkJoin with selector middle empty', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = empty<number>();
  const zs = of(39, 42, 25);

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(undefined);
});

test('AsyncIterable#forkJoin with selector last empty', async ([forkJoin]) => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = empty<number>();

  const res = await forkJoin(([x, y, z]) => x + y + z, xs, ys, zs);
  expect(res).toBe(undefined);
});
