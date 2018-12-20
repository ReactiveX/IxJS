import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.reverse]);
const { empty } = Ix.asynciterable;
const { of } = Ix.AsyncIterable;
const { _throw } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#reverse empty', async ([reverse]) => {
  const xs = empty<number>();
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#revrse single element', async ([reverse]) => {
  const xs = of(42);
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#reverse multiple elements', async ([reverse]) => {
  const xs = of(1, 2, 3);
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 3);
  await hasNext(it, 2);
  await hasNext(it, 1);
  await noNext(it);
});

test('AsyncIterable#reverse throws', async ([reverse]) => {
  const xs = _throw<number>(new Error());
  const ys = reverse(xs);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
