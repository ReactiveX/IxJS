import * as Ix from '../Ix';
const { generate } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#generate generates normal sequence', async () => {
  const xs = generate(0, async x => x < 5, async x => x + 1, async x => x * x);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 4);
  await hasNext(it, 9);
  await hasNext(it, 16);
  await noNext(it);
});

test('AsyncIterable#generate condition throws', async () => {
  const err = new Error();
  const xs = generate(
    0,
    async _ => {
      throw err;
    },
    async x => x + 1,
    async x => x * x
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#generate increment throws', async () => {
  const err = new Error();
  const xs = generate(
    0,
    async x => x < 5,
    async _ => {
      throw err;
    },
    async x => x * x
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#generate result selector throws', async () => {
  const err = new Error();
  const xs = generate(
    0,
    async x => x < 5,
    async x => x + 1,
    async _ => {
      throw err;
    }
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
