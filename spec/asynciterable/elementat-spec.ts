import '../asynciterablehelpers';
import { elementAt, empty, of } from 'ix/asynciterable';

test('AsyncIterable#elementAt empty returns undefined', async () => {
  const xs = empty();
  const res = await elementAt<number>(xs, 0);
  expect(res).toBeUndefined();
});

test('AsyncIterable#elementAt single value first index', async () => {
  const xs = of(42);
  const res = await elementAt(xs, 0);
  expect(res).toBe(42);
});

test('AsyncIterable#elementAt single value invalid index', async () => {
  const xs = of(42);
  const res = await elementAt(xs, 1);
  expect(res).toBeUndefined();
});

test('AsyncIterable#elementAt multiple values valid index', async () => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 1);
  expect(res).toBe(42);
});

test('AsyncIterable#elementAt multiple values invalid index', async () => {
  const xs = of(1, 42, 3);
  const res = await elementAt(xs, 7);
  expect(res).toBeUndefined();
});
