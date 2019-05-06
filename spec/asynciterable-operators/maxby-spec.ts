import { empty, of, sequenceEqual } from 'ix/asynciterable';
import { maxBy } from 'ix/asynciterable/operators';

test('AsyncIterable#maxBy', async () => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await maxBy(source, async x => x % 3);
  expect(sequenceEqual(res, of(2, 5, 2))).toBeTruthy();
});

test('AsyncIterable#maxBy empty throws', async () => {
  const source = empty<number>();

  try {
    await maxBy(source, async x => x % 3);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
