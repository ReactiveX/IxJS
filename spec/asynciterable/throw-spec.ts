import * as Ix from '../Ix';
const { _throw } = Ix.asynciterable;

test('AsyncIterable#throw throws', async () => {
  const xs = _throw<number>(new Error());

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
