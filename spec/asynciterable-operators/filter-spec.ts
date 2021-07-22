import { hasNext, noNext } from '../asynciterablehelpers';
import { empty, of, throwError } from 'ix/asynciterable';
import { filter } from 'ix/asynciterable/operators';

test('AsyncIterable#filter', async () => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = xs.pipe(filter(async (x) => x % 2 === 0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 4);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#filter with index', async () => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const ys = xs.pipe(filter(async (_, i) => i % 2 === 0));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 7);
  await hasNext(it, 6);
  await hasNext(it, 2);
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#filter with typeguard', async () => {
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
  const ys = xs.pipe(filter((x): x is string => x instanceof String));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, new String('8'));
  await hasNext(it, new String('7'));
  await hasNext(it, new String('6'));
  await hasNext(it, new String('2'));
  await hasNext(it, new String('0'));
  await noNext(it);
});

test('AsyncIterable#filter throws part way through', async () => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = xs.pipe(
    filter(async (x) => {
      if (x === 4) {
        throw err;
      }
      return true;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 5);
  await hasNext(it, 7);
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#filter with index throws part way through', async () => {
  const xs = of(8, 5, 7, 4, 6, 9, 2, 1, 0);
  const err = new Error();
  const ys = xs.pipe(
    filter(async (_, i) => {
      if (i === 3) {
        throw err;
      }
      return true;
    })
  );

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 8);
  await hasNext(it, 5);
  await hasNext(it, 7);
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#filter with error source', async () => {
  const xs = throwError(new Error());
  const ys = xs.pipe(filter(async (x) => x % 2 === 0));

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow();
});

test('AsyncIterable#filter with empty source', async () => {
  const xs = empty();
  const ys = xs.pipe(filter(async (x) => x % 2 === 0));

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});
