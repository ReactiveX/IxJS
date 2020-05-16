import '../asynciterablehelpers';
import { throwError } from 'ix/asynciterable';

test('AsyncIterable#throw throws', async () => {
  const xs = throwError(new Error());

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
