import '../asynciterablehelpers';
import { of, toMap } from 'ix/asynciterable';

test('AsyncIterable#toMap stores values', async () => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2);
  expect(res.get(0)).toBe(4);
  expect(res.get(1)).toBe(1);
});

test('AsyncIterable#toMap overwrites duplicates', async () => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2);
  expect(res.get(0)).toBe(2);
  expect(res.get(1)).toBe(1);
});

test('AsyncIterable#toMap with element selector', async () => {
  const xs = of(1, 4);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  expect(res.get(0)).toBe(5);
  expect(res.get(1)).toBe(2);
});

test('AsyncIterable#toMap with element selector overwrites duplicates', async () => {
  const xs = of(1, 4, 2);
  const res = await toMap(xs, async x => x % 2, async x => x + 1);
  expect(res.get(0)).toBe(3);
  expect(res.get(1)).toBe(2);
});
