import '../asynciterablehelpers';
import { empty, minBy, of } from 'ix/asynciterable';
import { sequenceEqual } from 'ix/iterable';

test('AsyncIterable#minBy', async () => {
  const source = of(3, 5, 7, 6, 4, 2);

  const res = await minBy(source, { selector: (x) => Math.floor(x / 2) });
  expect(sequenceEqual(res, [3, 2])).toBeTruthy();
});

test('AsyncIterable#minBy empty throws', async () => {
  const source = empty();

  try {
    await minBy(source, { selector: (x) => Math.floor(x / 2) });
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});
