import { elementAt } from 'ix/iterable';

test('Iterable#elementAt empty returns undefined', () => {
  const res = elementAt<number>([], 0);
  expect(res).toBe(undefined);
});

test('Iterable#elementAt single value first index', () => {
  const res = elementAt([42], 0);
  expect(res).toBe(42);
});

test('Iterable#elementAt single value invalid index', () => {
  const res = elementAt([42], 1);
  expect(res).toBe(undefined);
});

test('Iterable#elementAt multiple values valid index', () => {
  const res = elementAt([1, 42, 3], 1);
  expect(res).toBe(42);
});

test('Iterable#elementAt multiple values invalid index', () => {
  const res = elementAt([1, 42, 3], 7);
  expect(res).toBe(undefined);
});
