import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.defaultIfEmpty]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#defaultIfEmpty with empty', async ([defaultIfEmpty]) => {
  const xs = empty<number>();
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await noNext(it);
});

test('AsyncIterable#defaultIfEmpty with no empty', async ([defaultIfEmpty]) => {
  const xs = of(42);
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#defaultIfEmpty throws', async ([defaultIfEmpty]) => {
  const xs = _throw<number>(new Error());
  const ys = defaultIfEmpty(xs, 0);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
