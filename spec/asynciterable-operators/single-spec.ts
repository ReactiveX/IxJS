import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.single]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#single no predicate empty returns undefined', async (t, [single]) => {
  const xs = empty<number>();
  const res = await single(xs);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#single with predicate empty returns undefined', async (t, [single]) => {
  const xs = empty<number>();
  const res = await single(xs, async () => true);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#single predicate miss', async (t, [single]) => {
  const xs = of(42);
  const res = await single(xs, x => x % 2 !== 0);
  t.equal(res, undefined);
  t.end();
});

test('AsyncIterable#single no predicate hit', async (t, [single]) => {
  const xs = of(42);
  const res = await single(xs);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#single predicate hit', async (t, [single]) => {
  const xs = of(42);
  const res = await single(xs, x => x % 2 === 0);
  t.equal(res, 42);
  t.end();
});

test('AsyncIterable#single no predicate multiple throws error', async (t, [single]) => {
  const xs = of(42, 45, 90);
  try {
    await single(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#single with predicate multiple throws error', async (t, [single]) => {
  const xs = of(42, 45, 90);
  try {
    await single(xs, async x => x % 2 === 0);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
