import { throwError } from 'ix/asynciterable';

test('AsyncIterable#throw throws', async () => {
  const xs = throwError<number>(new Error());

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
