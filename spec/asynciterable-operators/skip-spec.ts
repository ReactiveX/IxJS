import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.skip]);
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#skip skips some', async (t, [skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skip skips more than count', async (t, [skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 10);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skip none', async (t, [skip]) => {
  const xs = of(1, 2, 3, 4);
  const ys = skip(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skip throws', async (t, [skip]) => {
  const err = new Error();
  const xs = _throw<number>(err);
  const ys = skip(xs, 2);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});
