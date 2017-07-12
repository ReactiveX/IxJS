import * as Ix from '../Ix';
import * as test from 'tape';
const { elementAt } = Ix.iterable;

test('Iterable#elementAt empty returns undefined', t => {
  const res = elementAt<number>([], 0);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#elementAt single value first index', t => {
  const res = elementAt([42], 0);
  t.equal(res, 42);
  t.end();
});

test('Iterable#elementAt single value invalid index', t => {
  const res = elementAt([42], 1);
  t.equal(res, undefined);
  t.end();
});

test('Iterable#elementAt multiple values valid index', t => {
  const res = elementAt([1, 42, 3], 1);
  t.equal(res, 42);
  t.end();
});

test('Iterable#elementAt multiple values invalid index', t => {
  const res = elementAt([1, 42, 3], 7);
  t.equal(res, undefined);
  t.end();
});
