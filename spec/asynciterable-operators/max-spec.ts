import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.max]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncItearble#max laws', async (t, [max]) => {
  const xs = of(5, 3, 1, 2, 4);
  t.equal(await max(xs), await max(xs, async x => x));
  t.end();
});

test('AsyncIterable#max empty throws', async (t, [max]) => {
  const xs = empty<number>();
  try {
    await max(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#max', async (t, [max]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs);
  t.equal(res, 5);
  t.end();
});

test('AsyncIterable#max with selector empty throws', async (t, [max]) => {
  const xs = empty<number>();
  try {
    await max(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#max with selector', async (t, [max]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs, async x => x * 2);
  t.equal(res, 10);
  t.end();
});
