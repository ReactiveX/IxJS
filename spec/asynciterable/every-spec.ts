import '../asynciterablehelpers.js';
import { every, of, throwError } from 'ix/asynciterable/index.js';

test('AsyncIterable#every not all match', async () => {
  const xs = of(1, 2, 3, 4);

  const ys = await every(xs, { predicate: async (x) => x % 2 === 0 });

  expect(ys).toBeFalsy();
});

test('AsyncIterable#every all match', async () => {
  const xs = of(2, 4, 6, 8);

  const ys = await every(xs, { predicate: async (x) => x % 2 === 0 });

  expect(ys).toBeTruthy();
});

test('AsyncIterable#every throws', async () => {
  const err = new Error();
  const xs = throwError(err);

  await expect(every(xs, { predicate: async (x) => x % 2 === 0 })).rejects.toThrow(err);
});

test('AsyncIterable#every predicate throws', async () => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);

  await expect(
    every(xs, {
      predicate: async () => {
        throw err;
      },
    })
  ).rejects.toThrow(err);
});
