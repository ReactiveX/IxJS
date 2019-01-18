import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.some]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#some some true', async ([some]) => {
  const xs = of(1, 2, 3, 4);
  const ys = await some(xs, async x => x % 2 === 0);
  expect(ys).toBeTruthy();
});

test('AsyncIterable#some some false', async ([some]) => {
  const xs = of(2, 4, 6, 8);
  const ys = await some(xs, async x => x % 2 !== 0);
  expect(ys).toBeFalsy();
});

test('AsyncIterable#some throws', async ([some]) => {
  const err = new Error();
  const xs = _throw<number>(err);

  try {
    await some(xs, async x => x % 2 === 0);
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#some predicate throws', async ([some]) => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await some(xs, async () => {
      throw err;
    });
  } catch (e) {
    expect(err).toEqual(e);
  }
});
