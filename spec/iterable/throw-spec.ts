import { throwError } from 'ix/iterable';

test('Iterable#throw throws', () => {
  const xs = throwError<number>(new Error());

  const it = xs[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
