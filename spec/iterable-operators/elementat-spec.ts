import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.elementAt]);

test('Iterable#elementAt empty returns undefined', (t, [elementAt]) => {
  const res = elementAt<number>([], 0);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#elementAt single value first index', (t, [elementAt]) => {
  const res = elementAt([42], 0);
  t.equal(res, 42);
  t.end();
});

test('Iterable#elementAt single value invalid index', (t, [elementAt]) => {
  const res = elementAt([42], 1);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#elementAt multiple values valid index', (t, [elementAt]) => {
  const res = elementAt([1, 42, 3], 1);
  t.equal(res, 42);
  t.end();
});

test('Iterable#elementAt multiple values invalid index', (t, [elementAt]) => {
  const res = elementAt([1, 42, 3], 7);
  t.equal(res, undefined);
  t.end();
});
