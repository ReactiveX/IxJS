import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.sum]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncIterable#sum laws', async (t, [sum]) => {
  const xs = of(1, 2, 3);
  t.equal(await sum(xs), await sum(xs, async x => x));
  t.end();
});

test('AsyncIterable#sum no selector empty', async (t, [sum]) => {
  const xs = empty<number>();
  const res = await sum(xs);
  t.equal(res, 0);
  t.end();
});

test('AsyncIterable#sum no selector', async (t, [sum]) => {
  const xs = of(1, 2, 3);
  const res = await sum(xs);
  t.equal(res, 6);
  t.end();
});

test('AsyncIterable#sum with selector empty', async (t, [sum]) => {
  const xs = empty<number>();
  const res = await sum(xs, async x => x * 2);
  t.equal(res, 0);
  t.end();
});

test('AsyncIterable#sum with selector', async (t, [sum]) => {
  const xs = of(1, 2, 3);
  const res = await sum(xs, async x => x * 2);
  t.equal(res, 12);
  t.end();
});
