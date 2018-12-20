import * as Ix from '../Ix';
const { generateTime } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#generateTime generateTimes normal sequence', async () => {
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 4);
  await hasNext(it, 9);
  await hasNext(it, 16);
  await noNext(it);
});

test('AsyncIterable#generateTime condition throws', async () => {
  const err = new Error();
  const xs = generateTime(
    0,
    async _ => {
      throw err;
    },
    async x => x + 1,
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#generateTime increment throws', async () => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async _ => {
      throw err;
    },
    async x => x * x,
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#generateTime result selector throws', async () => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async _ => {
      throw err;
    },
    async x => x * 100
  );

  const it = xs[Symbol.asyncIterator]();

  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});

test('AsyncIterable#generateTime time selector throws', async () => {
  const err = new Error();
  const xs = generateTime(
    0,
    async x => x < 5,
    async x => x + 1,
    async x => x * x,
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
