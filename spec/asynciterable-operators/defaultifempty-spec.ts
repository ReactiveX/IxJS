import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.defaultIfEmpty]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#defaultIfEmpty with empty', async (t, [defaultIfEmpty]) => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#defaultIfEmpty with no empty', async (t, [defaultIfEmpty]) => {
  const xs = of(42);
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#defaultIfEmpty throws', async (t, [defaultIfEmpty]) => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
