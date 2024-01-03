import '../asynciterablehelpers.js';
import { of, empty, max } from 'ix/asynciterable/index.js';

test('AsyncItearble#max laws', async () => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await max(xs)).toBe(await max(xs, { selector: (x) => x }));
});

test('AsyncIterable#max empty throws', async () => {
  const xs = empty();
  await expect(max(xs)).rejects.toThrow();
});

test('AsyncIterable#max', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs);
  expect(res).toBe(5);
});
