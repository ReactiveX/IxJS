import '../iterablehelpers';
import { single } from 'ix/iterable';

test('Iterable#single no predicate empty returns undefined', () => {
  const res = single<number>([]);
  expect(res).toBe(undefined);
});

test('Iterable#single with predicate empty returns undefined', () => {
  const res = single<number>([], { predicate: () => true });
  expect(res).toBe(undefined);
});

test('Iterable#single predicate miss', () => {
  const res = single([42], { predicate: (x) => x % 2 !== 0 });
  expect(res).toBe(undefined);
});

test('Iterable#single no predicate hit', () => {
  const res = single([42]);
  expect(res).toBe(42);
});

test('Iterable#single predicate hit', () => {
  const res = single([42], { predicate: (x) => x % 2 === 0 });
  expect(res).toBe(42);
});

test('Iterable#single no predicate multiple throws error', () => {
  expect(() => single([42, 45, 90])).toThrow();
});

test('Iterable#single with predicate multiple throws error', () => {
  expect(() => single([42, 45, 90], { predicate: (x) => x % 2 === 0 })).toThrow();
});
