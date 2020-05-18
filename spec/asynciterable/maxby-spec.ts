import '../asynciterablehelpers';
import { empty, maxBy, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#maxBy', async () => {
  const source = of(2, 5, 0, 7, 4, 3, 6, 2, 1);

  const res = await maxBy(source, { selector: async (x) => x % 3 });
  expect(sequenceEqual(res, [2, 5, 2])).toBeTruthy();
});

test('AsyncIterable#maxBy empty throws', async () => {
  const source = empty();

  try {
    await maxBy(source, { selector: async (x) => x % 3 });
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
