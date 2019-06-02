import { of, includes } from 'ix/asynciterable';

test('AsyncIterable#includes includes', async () => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3);
  expect(ys).toBeTruthy();
});

test('AsyncIterable#includes does not include', async () => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 6);
  expect(ys).toBeFalsy();
});

test('AsyncIterable#includes fromIndex hits', async () => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 3, 2);
  expect(ys).toBeTruthy();
});

test('AsyncIterable#includes fromIndex misses', async () => {
  const xs = of(1, 2, 3, 4, 5);
  const ys = await includes(xs, 1, 2);
  expect(ys).toBeFalsy();
});
