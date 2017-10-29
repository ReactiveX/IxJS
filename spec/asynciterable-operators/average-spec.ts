import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.average]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('Iterable#average empty', async (t, [average]) => {
  const xs = empty<number>();
  try {
    await average(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#average', async (t, [average]) => {
  const res = await average(of(1, 2, 3));
  t.equal(res, 2);
  t.end();
});

test('Iterable#average with selector empty', async (t, [average]) => {
  const xs = empty<number>();
  try {
    await average(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('Iterable#average with selector', async (t, [average]) => {
  const res = await average(of(1, 2, 3), x => x * 2);
  t.equal(res, 4);
  t.end();
});

test('Iterable#average laws', async (t, [average]) => {
  const xs = of(1, 2, 3);
  t.equal(await average(xs), await average(xs, x => x));
  t.end();
});
