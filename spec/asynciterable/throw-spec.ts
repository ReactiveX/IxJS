import '../asynciterablehelpers.js';
import { throwError } from 'ix/asynciterable/index.js';

test('AsyncIterable#throw throws', async () => {
  const xs = throwError(new Error());

  const it = xs[Symbol.asyncIterator]();

  await expect(it.next()).rejects.toThrow();
});
