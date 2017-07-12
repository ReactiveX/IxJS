import * as Ix from '../Ix';
import * as test from 'tape';
const { elementAt } = Ix.asynciterable;
const { empty } = Ix.asynciterable;
const { of } = Ix.asynciterable;

test('AsyncIterable#elementAt empty returns undefined', async (t: test.Test) => {
  const xs = empty<number>();
  const res = await elementAt<number>(xs, 0);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#elementAt single value first index', async (t: test.Test) => {
  const xs = of(42);
  const res = await elementAt(xs, 0);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#elementAt single value invalid index', async (t: test.Test) => {
  const xs = of(42);
  const res = await elementAt(xs, 1);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#elementAt multiple values valid index', async (t: test.Test) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 1);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#elementAt multiple values invalid index', async (t: test.Test) => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 7);
  t.equal(res, undefined);
  t.end();
});
