import * as Ix from '../Ix';
import * as test from 'tape-async';
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { reverse } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#reverse empty', async t => {
  const xs = empty<number>();
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#revrse single element', async t => {
  const xs = of(42);
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#reverse multiple elements', async t => {
  const xs = of(1, 2, 3);
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 3);
  await hasNext(t, it, 2);
  await hasNext(t, it, 1);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#reverse throws', async t => {
  const xs = _throw<number>(new Error());
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.assert(e != null);
  }
  t.end();
});
