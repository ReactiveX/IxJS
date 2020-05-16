import '../asynciterablehelpers';
import { empty, minBy, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#minBy', async () => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await minBy(source, async (x) => x % 3);
  expect(sequenceEqual(res, [0, 3, 6])).toBeTruthy();
});

test('AsyncIterable#minBy empty throws', async () => {
  const source = empty();

  try {
    await minBy(source, async (x) => x % 3);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
