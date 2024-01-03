import '../iterablehelpers';
import { throwError } from 'ix/iterable/index.js';

test('Iterable#throw throws', () => {
  const xs = throwError(new Error());

  const it = xs[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
