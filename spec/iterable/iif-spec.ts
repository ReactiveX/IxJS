import { iif, single } from 'ix/iterable';
import { isEmpty } from 'ix/asynciterable/operators';

test('Iterable#if then and else', () => {
  let x = 5;
  const res = iif(() => x > 0, [+1], [-1]);

  expect(+1).toBe(single(res));

  x = -x;
  expect(-1).toBe(single(res));
});

test('Iterable#if then default else', () => {
  let x = 5;
  const res = iif(() => x > 0, [+1]);

  expect(+1).toBe(single(res));

  x = -x;
  expect(res.pipe(isEmpty())).toBeTruthy();
});
