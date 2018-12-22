import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.reduceRight]);
const { empty } = Ix.iterable;
const { of } = Ix.Iterable;

test('Iterable#reduceRight no seed', ([reduceRight]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduceRight(xs, (x, y, i) => x + y + i);
  expect(ys).toBe(16);
});

test('Iterable#reduceRight no seed empty throws', ([reduceRight]) => {
  const xs = empty<number>();
  expect(() => reduceRight(xs, (x, y, i) => x + y + i)).toThrow();
});

test('Iterable#reduceRight with seed', ([reduceRight]) => {
  const xs = of(0, 1, 2, 3, 4);
  const ys = reduceRight(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(0);
});

test('Iterable#reduceRight with seed empty', ([reduceRight]) => {
  const xs = empty<number>();
  const ys = reduceRight(xs, (x, y, i) => x - y - i, 20);
  expect(ys).toBe(20);
});
