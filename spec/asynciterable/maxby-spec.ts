import '../asynciterablehelpers';
import { empty, maxBy, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#maxBy', async () => {
  const source = of(3, 5, 7, 6, 4, 2);

  const res = await maxBy(source, { selector: async (x) => Math.floor(x / 2) });
  expect(sequenceEqual(res, [7, 6])).toBeTruthy();
});

test('AsyncIterable#maxBy empty throws', async () => {
  const source = empty();

  try {
    await maxBy(source, { selector: async (x) => Math.floor(x / 2) });
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
