import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.includes]);
const { of } = Ix.AsyncIterable;

test('AsyncIterable#includes includes', async (t, [includes]) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3);
  t.true(ys);
  t.end();
});

test('AsyncIterable#includes does not include', async (t, [includes]) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 6);
  t.false(ys);
  t.end();
});

test('AsyncIterable#includes fromIndex hits', async (t, [includes]) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3, 2);
  t.true(ys);
  t.end();
});

test('AsyncIterable#includes fromIndex misses', async (t, [includes]) => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 1, 2);
  t.false(ys);
  t.end();
});
