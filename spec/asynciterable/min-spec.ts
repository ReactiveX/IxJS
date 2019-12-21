import '../asynciterablehelpers';
import { empty, of, min } from 'ix/asynciterable';

test('AsyncItearble#min laws', async () => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await min(xs)).toBe(await min(xs, x => x));
});

test('AsyncIterable#min empty throws', async () => {
  const xs = empty<number>();
  try {
    await min(xs);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#min', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs);
  expect(res).toBe(1);
});

test('AsyncIterable#min with selector empty throws', async () => {
  const xs = empty<number>();
  try {
    await min(xs, async x => x * 2);
  } catch (e) {
    expect(e != null).toBeTruthy();
  }
});

test('AsyncIterable#min with selector', async () => {
  const xs = of(5, 3, 1, 2, 4);
  const res = await min(xs, async x => x * 2);
  expect(res).toBe(2);
});
