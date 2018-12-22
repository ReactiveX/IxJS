import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.reduceRight]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#reduceRight no seed', async ([reduceRight]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, (x, y, i) => x + y + i);
  expect(ys).toBe(16);
});

test('AsyncIterable#reduceRight no seed empty throws', async ([reduceRight]) => {
  const xs = empty<number>();
  try {
    await reduceRight(xs, (x, y, i) => x + y + i);
  } catch (e) {
    expect(e !== null).toBeTruthy();
  }
});

test('AsyncIterable#reduceRight with seed', async ([reduceRight]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = await reduceRight(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(0);
});

test('AsyncIterable#reduceRight with seed empty', async ([reduceRight]) => {
  const xs = empty<number>();
  const ys = await reduceRight(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(20);
});
