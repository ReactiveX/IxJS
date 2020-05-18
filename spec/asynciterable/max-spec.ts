import '../asynciterablehelpers';
import { of, empty, max } from 'ix/asynciterable';

test('AsyncItearble#max laws', async () => {
  const xs = of(5, 3, 1, 2, 4);
  expect(await max(xs)).toBe(await max(xs, { selector: (x) => x }));
});

test('AsyncIterable#max empty throws', async () => {
  const xs = empty();
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
