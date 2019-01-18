import * as Ix from '../Ix';
const { _if } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { single } = Ix.iterable;

test('Iterable#if then and else', () => {
  let x = 5;
  const res = _if(() => x > 0, [+1], [-1]);

  expect(+1).toBe(single(res));

  x = -x;
  expect(-1).toBe(single(res));
});

test('Iterable#if then default else', () => {
  let x = 5;
  const res = _if(() => x > 0, [+1]);

  expect(+1).toBe(single(res));

  x = -x;
  expect(isEmpty(res)).toBeTruthy();
});
