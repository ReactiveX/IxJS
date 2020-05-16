import '../iterablehelpers';
import { average } from 'ix/iterable';

test('Iterable#average empty', () => {
  expect(() => average([])).toThrow();
});

test('Iterable#average', () => {
  const res = average([1, 2, 3]);
  expect(res).toBe(2);
});

test('Iterable#average with selector empty', () => {
  expect(() => average<number>([], { selector: (x) => x * 2 })).toThrow();
});

test('Iterable#average with selector', () => {
  const res = average([1, 2, 3], { selector: (x) => x * 2 });
  expect(res).toBe(4);
});

test('Iterable#average laws', () => {
  const xs = [1, 2, 3];
  expect(average(xs)).toBe(average(xs, { selector: (x) => x }));
});
