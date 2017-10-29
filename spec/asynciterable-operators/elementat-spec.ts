import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.elementAt]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#elementAt empty returns undefined', async (t, [elementAt]) => {
  const xs = empty<number>();
  const res = await elementAt<number>(xs, 0);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#elementAt single value first index', async (t, [elementAt]) => {
  const xs = of(42);
  const res = await elementAt(xs, 0);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#elementAt single value invalid index', async (t, [elementAt]) => {
  const xs = of(42);
  const res = await elementAt(xs, 1);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#elementAt multiple values valid index', async (t, [elementAt]) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 1);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#elementAt multiple values invalid index', async (t, [elementAt]) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 7);
  t.equal(res, undefined);
  t.end();
});
