import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.min]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;

test('AsyncItearble#min laws', async (t, [min]) => {
  const xs = of(5, 3, 1, 2, 4);
  t.equal(await min(xs), await min(xs, x => x));
  t.end();
});

test('AsyncIterable#min empty throws', async (t, [min]) => {
  const xs = empty<number>();
  try {
    await min(xs);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#min', async (t, [min]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs);
  t.equal(res, 1);
  t.end();
});

test('AsyncIterable#min with selector empty throws', async (t, [min]) => {
  const xs = empty<number>();
  try {
    await min(xs, async x => x * 2);
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});

test('AsyncIterable#min with selector', async (t, [min]) => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs, async x => x * 2);
  t.equal(res, 2);
  t.end();
});
