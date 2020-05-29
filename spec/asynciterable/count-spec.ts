import '../asynciterablehelpers';
import { count, empty, of, throwError } from 'ix/asynciterable';

test('AsyncItearble#count some', async () => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs);

  expect(ys).toBe(4);
});

test('AsyncIterable#count empty', async () => {
  const xs = empty();

  const ys = await count(xs);

  expect(ys).toBe(0);
});

test('AsyncIterable#count throws', async () => {
  const err = new Error();
  const xs = throwError(err);

  try {
    await count(xs);
  } catch (e) {
    expect(e).toEqual(err);
  }
});

test('AsyncIterable#count predicate some match', async () => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, { predicate: async (x) => x > 3 });

  expect(ys).toBe(1);
});

test('AsyncIterable#count predicate all match', async () => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, { predicate: async (x) => x > 0 });

  expect(ys).toBe(4);
});

test('AsyncIterable#count predicate none match', async () => {
  const xs = of(1, 2, 3, 4);

  const ys = await count(xs, { predicate: async (x) => x > 4 });

  expect(ys).toBe(0);
});

test('AsyncIterable#count predicate throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  try {
    await count(xs, {
      predicate: async () => {
        throw err;
      },
    });
  } catch (e) {
    expect(e).toEqual(err);
  }
});
