import * as Ix from '../Ix';
const { range } = Ix.asynciterable;

test('AsyncIterable#forEach', async () => {
  let n = 0;

  await range(5, 3).forEach(async x => {
    n += x;
  });

  expect(5 + 6 + 7).toBe(n);
});

test('AsyncIterable#forEach with index', async () => {
  let n = 0;

  await range(5, 3).forEach(async (x, i) => {
    n += x * i;
  });

  expect(5 * 0 + 6 * 1 + 7 * 2).toBe(n);
});
