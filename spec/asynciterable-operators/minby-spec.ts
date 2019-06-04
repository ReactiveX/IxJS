import '../asynciterablehelpers';
import { empty, of, sequenceEqual } from 'ix/asynciterable';
import { minBy } from 'ix/asynciterable/operators';

test('AsyncIterable#minBy', async () => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = source.pipe(minBy(async x => x % 3));
  expect(await sequenceEqual(res, of(0, 3, 6))).toBeTruthy();
});

test('AsyncIterable#minBy empty throws', async () => {
  const source = empty<number>();

  try {
    await source.pipe(minBy(async x => x % 3));
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
