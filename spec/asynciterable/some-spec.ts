import '../asynciterablehelpers';
import { of, throwError, some } from 'ix/asynciterable';

test('AsyncIterable#some some true', async () => {
  const xs = of(1, 2, 3, 4);
  const ys = await some(xs, { predicate: async (x) => x % 2 === 0 });
  expect(ys).toBeTruthy();
});

test('AsyncIterable#some some false', async () => {
  const xs = of(2, 4, 6, 8);
  const ys = await some(xs, { predicate: async (x) => x % 2 !== 0 });
  expect(ys).toBeFalsy();
});

test('AsyncIterable#some throws', async () => {
  const err = new Error();
  const xs = throwError(err);

  try {
    await some(xs, { predicate: async (x) => x % 2 === 0 });
  } catch (e) {
    expect(e).toEqual(err);
  }
});

test('AsyncIterable#some predicate throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await some(xs, {
      predicate: async () => {
        throw err;
      },
    });
  } catch (e) {
    expect(e).toEqual(err);
  }
});
