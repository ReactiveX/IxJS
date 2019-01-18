import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.skip]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#skip skips some', async ([skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skip skips more than count', async ([skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 10);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#skip none', async ([skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#skip throws', async ([skip]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = skip(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(err).toEqual(e);
  }
});
