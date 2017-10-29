import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.some]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#some some true', async (t, [some]) => {
  const xs = of(1, 2, 3, 4);
  const ys = await some(xs, async x => x % 2 === 0);
  t.true(ys);
  t.end();
});

test('AsyncIterable#some some false', async (t, [some]) => {
  const xs = of(2, 4, 6, 8);
  const ys = await some(xs, async x => x % 2 !== 0);
  t.false(ys);
  t.end();
});

test('AsyncIterable#some throws', async (t, [some]) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await some(xs, async x => x % 2 === 0);
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#some predicate throws', async (t, [some]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await some(xs, async () => {
      throw err;
    });
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
