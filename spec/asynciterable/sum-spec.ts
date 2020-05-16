import '../asynciterablehelpers';
import { of, empty, sum } from 'ix/asynciterable';

test('AsyncIterable#sum laws', async () => {
  const xs = of(1, 2, 3);
  expect(await sum(xs)).toBe(await sum(xs, { selector: async (x) => x }));
});

test('AsyncIterable#sum no selector empty', async () => {
  const xs = empty();
  const res = await sum(xs);
  expect(res).toBe(0);
});

test('AsyncIterable#sum no selector', async () => {
  const xs = of(1, 2, 3);
  const res = await sum(xs);
  expect(res).toBe(6);
});

test('AsyncIterable#sum with selector empty', async () => {
  const xs = empty();
  const res = await sum(xs, { selector: async (x) => x * 2 });
  expect(res).toBe(0);
});

test('AsyncIterable#sum with selector', async () => {
  const xs = of(1, 2, 3);
  const res = await sum(xs, { selector: async (x) => x * 2 });
  expect(res).toBe(12);
});
