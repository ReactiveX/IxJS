import * as Ix from '../Ix';
import * as test from 'tape-async';
const { asyncifyErrback } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#asyncifyErrback single argument', async t => {
  const callbackFn = (a: number, b: number, cb: Function) => {
    cb(null, a + b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#asyncifyErrback with error', async t => {
  const error = new Error();
  const callbackFn = (a: number, b: number, cb: Function) => {
    cb(error, a + b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(error, e);
  }
  t.end();
});

test('AsyncIterable#asyncifyErrback multiple arguments', async t => {
  const callbackFn = (a: number, b: number, cb: Function) => {
    cb(null, a, b);
  };

  const asyncFn = asyncifyErrback(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  const { value, done } = await it.next();
  t.true(sequenceEqual(value as number[], [1, 2]));
  t.false(done);
  await noNext(t, it);
  t.end();
});
