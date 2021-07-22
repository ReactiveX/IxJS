import '../asynciterablehelpers';
import { average, empty, of } from 'ix/asynciterable';

test('Iterable#average empty', async () => {
  const xs = empty();
  await expect(average(xs)).rejects.toThrow();
});

test('Iterable#average', async () => {
  const res = await average(of(1, 2, 3));
  expect(res).toBe(2);
});

test('Iterable#average with selector empty', async () => {
  const xs = empty();
  await expect(average(xs, { selector: async (x) => x * 2 })).rejects.toThrow();
});

test('Iterable#average with selector', async () => {
  const res = await average(of(1, 2, 3), { selector: (x) => x * 2 });
  expect(res).toBe(4);
});

test('Iterable#average laws', async () => {
  const xs = of(1, 2, 3);
  expect(await average(xs)).toBe(await average(xs, { selector: (x) => x }));
});
