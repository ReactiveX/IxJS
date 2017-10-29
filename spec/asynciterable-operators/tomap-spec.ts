import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toMap]);
const { of } = Ix.AsyncIterable;

test('AsyncIterable#toMap stores values', async (t, [toMap]) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2);
  t.equal(res.get(0), 4);
  t.equal(res.get(1), 1);
  t.end();
});

test('AsyncIterable#toMap overwrites duplicates', async (t, [toMap]) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2);
  t.equal(res.get(0), 2);
  t.equal(res.get(1), 1);
  t.end();
});

test('AsyncIterable#toMap with element selector', async (t, [toMap]) => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  t.equal(res.get(0), 5);
  t.equal(res.get(1), 2);
  t.end();
});

test('AsyncIterable#toMap with element selector overwrites duplicates', async (t, [toMap]) => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  t.equal(res.get(0), 3);
  t.equal(res.get(1), 2);
  t.end();
});
