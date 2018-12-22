import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.every]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#every not all match', async ([every]) => {
  const xs = of(1, 2, 3, 4);

  const ys = await every(xs, async x => x % 2 === 0);

  expect(ys).toBeFalsy();
});

test('AsyncIterable#every all match', async ([every]) => {
  const xs = of(2, 4, 6, 8);

  const ys = await every(xs, async x => x % 2 === 0);

  expect(ys).toBeTruthy();
});

test('AsyncIterable#every throws', async ([every]) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await every(xs, async x => x % 2 === 0);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#every predicate throws', async ([every]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await every(xs, async () => {
      throw err;
    });
  } catch (e) {
    expect(err).toEqual(e);
  }
});
