import '../asynciterablehelpers.js';
import { empty, range, sequenceEqual } from 'ix/asynciterable/index.js';
import { skipLast, take } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#skipLast empty', async () => {
  const e = empty();
  const r = e.pipe(skipLast(1));
  expect(await sequenceEqual(r, e)).toBeTruthy();
});

test('AsyncIterable#skipLast partial', async () => {
  const e = range(0, 5);
  const r = e.pipe(skipLast(3));
  expect(await sequenceEqual(r, e.pipe(take(2)))).toBeTruthy();
});
