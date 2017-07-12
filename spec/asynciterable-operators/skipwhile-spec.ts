import * as Ix from '../Ix';
import * as test from 'tape';
const { of } = Ix.asynciterable;
const { skipWhile } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#skipWhile skips some', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skipWhile skips none', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async () => false);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skipWhile skips all', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async () => true);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skipWhile skips some another run', async t => {
  const xs = of(1, 2, 3, 4, 3, 2, 1);
  const ys = skipWhile(xs, x => x < 3);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await hasNext(t, it, 3);
  await hasNext(t, it, 2);
  await hasNext(t, it, 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#skipWhile predicate throws', async t => {
  const err = new Error();
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, () => { throw err; });

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }
  t.end();
});

test('AsyncIterable#skipWhile with index', async t => {
  const xs = of(1, 2, 3, 4);
  const ys = skipWhile(xs, async (x, i) => i < 2);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 4);
  await noNext(t, it);
  t.end();
});
