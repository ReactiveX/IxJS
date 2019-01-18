import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.single]);

test('Iterable#single no predicate empty returns undefined', ([single]) => {
  const res = single<number>([]);
  expect(res).toBe(undefined);
});

test('Iterable#single with predicate empty returns undefined', ([single]) => {
  const res = single<number>([], () => true);
  expect(res).toBe(undefined);
});

test('Iterable#single predicate miss', ([single]) => {
  const res = single([42], x => x % 2 !== 0);
  expect(res).toBe(undefined);
});

test('Iterable#single no predicate hit', ([single]) => {
  const res = single([42]);
  expect(res).toBe(42);
});

test('Iterable#single predicate hit', ([single]) => {
  const res = single([42], x => x % 2 === 0);
  expect(res).toBe(42);
});

test('Iterable#single no predicate multiple throws error', ([single]) => {
  expect(() => single([42, 45, 90])).toThrow();
});

test('Iterable#single with predicate multiple throws error', ([single]) => {
  expect(() => single([42, 45, 90], x => x % 2 === 0)).toThrow();
});
