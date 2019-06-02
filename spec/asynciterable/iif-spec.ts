import { iif, isEmpty, of, single } from 'ix/asynciterable';

test('AsyncIterable#if then and else', async () => {
  let x = 5;
  const res = iif(async () => x > 0, of(+1), of(-1));

  expect(+1).toBe(await single(res));

  x = -x;
  expect(-1).toBe(await single(res));
});

test('AsyncIterable#if then default else', async () => {
  let x = 5;
  const res = iif(async () => x > 0, of(+1));

  expect(+1).toBe(await single(res));

  x = -x;
  expect(await isEmpty(res)).toBeTruthy();
});
