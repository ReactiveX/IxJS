import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.filter]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#filter', async ([filter]) => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 4);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#filter with index', async ([filter]) => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = filter(xs, async (_, i) => i % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 7);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#filter with typeguard', async ([filter]) => {
  const xs = of<any>(
    new String('8'),
    5,
    new String('7'),
    4,
    new String('6'),
    9,
    new String('2'),
    1,
    new String('0')
  );
  const ys = filter(xs, (x): x is string => x instanceof String);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, new String('8'));
  await hasNext(it, new String('7'));
  await hasNext(it, new String('6'));
  await hasNext(it, new String('2'));
  await hasNext(it, new String('0'));
  await noNext(it);
});

test('AsyncIterable#filter throws part way through', async ([filter]) => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = filter(xs, async x => {
    if (x === 4) {
      throw err;
    }
    return true;
  });

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 5);
  await hasNext(it, 7);
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#filter with index throws part way through', async ([filter]) => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = filter(xs, async (_, i) => {
    if (i === 3) {
      throw err;
    }
    return true;
  });

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 5);
  await hasNext(it, 7);
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#filter with error source', async ([filter]) => {
  const xs = _throw<number>(new Error());
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#filter with empty source', async ([filter]) => {
  const xs = empty<number>();
  const ys = filter(xs, async x => x % 2 === 0);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});
