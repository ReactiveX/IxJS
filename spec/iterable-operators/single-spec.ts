import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.single]);

test('Iterable#single no predicate empty returns undefined', (t, [single]) => {
  const res = single<number>([]);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single with predicate empty returns undefined', (t, [single]) => {
  const res = single<number>([], () => true);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single predicate miss', (t, [single]) => {
  const res = single([42], x => x % 2 !== 0);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#single no predicate hit', (t, [single]) => {
  const res = single([42]);
  t.equal(res, 42);
  t.end();
});

test('Iterable#single predicate hit', (t, [single]) => {
  const res = single([42], x => x % 2 === 0);
  t.equal(res, 42);
  t.end();
});

test('Iterable#single no predicate multiple throws error', (t, [single]) => {
  t.throws(() => single([42, 45, 90]));
  t.end();
});

test('Iterable#single with predicate multiple throws error', (t, [single]) => {
  t.throws(() => single([42, 45, 90], x => x % 2 === 0));
  t.end();
});
