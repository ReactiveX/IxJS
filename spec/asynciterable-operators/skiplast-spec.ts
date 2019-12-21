import '../asynciterablehelpers';
import { empty, range, sequenceEqual } from 'ix/asynciterable';
import { skipLast, take } from 'ix/asynciterable/operators';

test('AsyncIterable#skipLast empty', async () => {
  const e = empty<number>();
  const r = e.pipe(skipLast(1));
  expect(await sequenceEqual(r, e)).toBeTruthy();
});

test('AsyncIterable#skipLast partial', async () => {
  const e = range(0, 5);
  const r = e.pipe(skipLast(3));
  expect(await sequenceEqual(r, e.pipe(take(2)))).toBeTruthy();
});
