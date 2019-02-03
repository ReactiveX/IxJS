import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.count]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncItearble#count some', async ([count]) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs);

  expect(ys).toBe(4);
});

test('AsyncIterable#count empty', async ([count]) => {
  const xs = empty<number>();

  const ys = await count(xs);

  expect(ys).toBe(0);
});

test('AsyncIterable#count throws', async ([count]) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await count(xs);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#count predicate some match', async ([count]) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 3);

  expect(ys).toBe(1);
});

test('AsyncIterable#count predicate all match', async ([count]) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 0);

  expect(ys).toBe(4);
});

test('AsyncIterable#count predicate none match', async ([count]) => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, async x => x > 4);

  expect(ys).toBe(0);
});

test('AsyncIterable#count predicate throws', async ([count]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await count(xs, async () => {
      throw err;
    });
  } catch (e) {
    expect(err).toEqual(e);
  }
});
