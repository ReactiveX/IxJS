import '../asynciterablehelpers';
import { throwError } from 'ix/asynciterable';

test('AsyncIterable#throw throws', async () => {
  const xs = throwError(new Error());

  const it = xs[Symbol.asyncIterator]();

  await expect(it.next()).rejects.toThrow();
});
