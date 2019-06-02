import { of, empty, max } from 'ix/asynciterable';

test('AsyncItearble#max laws', async () => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await max(xs)).toBe(await max(xs, async x => x));
});

test('AsyncIterable#max empty throws', async () => {
  const xs = empty<number>();
  try {
    await max(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#max', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs);
  expect(res).toBe(5);
});

test('AsyncIterable#max with selector empty throws', async () => {
  const xs = empty<number>();
  try {
    await max(xs, async x => x * 2);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#max with selector', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await max(xs, async x => x * 2);
  expect(res).toBe(10);
});
