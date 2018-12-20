import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.sum]);

test('Iterable#sum laws', ([sum]) => {
  const xs = [1, 2, 3];
  expect(sum(xs)).toBe(sum(xs, x => x));
});

test('Iterable#sum no selector empty', ([sum]) => {
  const xs: number[] = [];
  expect(sum(xs)).toBe(0);
});

test('#Iterable#sum no selector', ([sum]) => {
  const xs: number[] = [1, 2, 3];
  expect(sum(xs)).toBe(6);
});

test('Iterable#sum with selector empty', ([sum]) => {
  const xs: number[] = [];
  expect(sum(xs, x => x * 2)).toBe(0);
});

test('#Iterable#sum with selector', ([sum]) => {
  const xs: number[] = [1, 2, 3];
  expect(sum(xs, x => x * 2)).toBe(12);
});
