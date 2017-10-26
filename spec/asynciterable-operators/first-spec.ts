import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { first } = Ix.asynciterable;

test('AsyncIterable#first empty returns undefined', async (t: test.Test) => {
  const xs = empty<number>();
  const ys = await first(xs);
  t.equal(ys, undefined);
  t.end();
});

test('AsyncIterable#first no predicate returns first', async (t: test.Test) => {
  const xs = of(1, 2, 3);
  const ys = await first(xs);
  t.equal(ys, 1);
  t.end();
});

test('AsyncIterable#first predicate empty returns undefined', async (t: test.Test) => {
  const xs = empty<number>();
  const ys = await first(xs, async () => true);
  t.equal(ys, undefined);
  t.end();
});

test('AsyncIterable#first predicate hits returns value', async (t: test.Test) => {
  const xs = of(1, 2, 3);
  const ys = await first(xs, async x => x % 2 === 0);
  t.equal(ys, 2);
  t.end();
});

test('AsyncIterable#first predicate misses returns undefined', async (t: test.Test) => {
  const xs = of(1, 3, 5);
  const ys = await first(xs, async x => x % 2 === 0);
  t.equal(ys, undefined);
  t.end();
});
