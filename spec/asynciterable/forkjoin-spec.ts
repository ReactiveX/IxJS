import '../asynciterablehelpers';
import { empty, forkJoin, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#forkJoin no selector all equal', async () => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 42, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector first smaller', async () => {
  const xs = of(42, 25);
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [25, 42, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector middle smaller', async () => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 39, 25])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector last smaller', async () => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = of(39, 42);

  const res = await forkJoin(xs, ys, zs);
  expect(sequenceEqual(res as number[], [39, 42, 42])).toBeTruthy();
});

test('AsyncIterable#forkJoin no selector first empty', async () => {
  const xs = empty();
  const ys = of(25, 39, 42);
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBeUndefined();
});

test('AsyncIterable#forkJoin no selector middle empty', async () => {
  const xs = of(42, 25, 39);
  const ys = empty();
  const zs = of(39, 42, 25);

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBeUndefined();
});

test('AsyncIterable#forkJoin no selector last empty', async () => {
  const xs = of(42, 25, 39);
  const ys = of(25, 39, 42);
  const zs = empty();

  const res = await forkJoin(xs, ys, zs);
  expect(res).toBeUndefined();
});
