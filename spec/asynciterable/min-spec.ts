import '../asynciterablehelpers.js';
import { empty, of, min } from 'ix/asynciterable/index.js';

test('AsyncItearble#min laws', async () => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await min(xs)).toBe(await min(xs, { selector: (x) => x }));
});

test('AsyncIterable#min empty throws', async () => {
  const xs = empty();
  await expect(min(xs)).rejects.toThrow();
});

test('AsyncIterable#min', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs);
  expect(res).toBe(1);
});
