import * as Ix from '../Ix';
import * as test from 'tape-async';
const { asyncify } = Ix.asynciterable;
const { sequenceEqual } = Ix.iterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#asyncify single argument', async t => {
  const callbackFn = (a: number, b: number, cb: Function) => {
    cb(a + b);
  };

  const asyncFn = asyncify(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#asyncify multiple arguments', async t => {
  const callbackFn = (a: number, b: number, cb: Function) => {
    cb(a, b);
  };

  const asyncFn = asyncify(callbackFn);
  const xs = asyncFn(1, 2);

  const it = xs[Symbol.asyncIterator]();
  const { value, done } = await it.next();
  t.true(sequenceEqual(value as number[], [1, 2]));
  t.false(done);
  await noNext(t, it);
  t.end();
});
