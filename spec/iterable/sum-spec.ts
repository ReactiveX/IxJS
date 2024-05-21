import '../iterablehelpers';
import { sum } from 'ix/iterable/index.js';

test('Iterable#sum laws', () => {
  const xs = [1, 2, 3];
  expect(sum(xs)).toBe(sum(xs, { selector: (x) => x }));
});

test('Iterable#sum no selector empty', () => {
  const xs: number[] = [];
  expect(sum(xs)).toBe(0);
});

test('#Iterable#sum no selector', () => {
  const xs: number[] = [1, 2, 3];
  expect(sum(xs)).toBe(6);
});

test('Iterable#sum with selector empty', () => {
  const xs: number[] = [];
  expect(sum(xs, { selector: (x) => x * 2 })).toBe(0);
});

test('#Iterable#sum with selector', () => {
  const xs: number[] = [1, 2, 3];
  expect(sum(xs, { selector: (x) => x * 2 })).toBe(12);
});
