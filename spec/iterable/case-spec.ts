import * as Ix from '../Ix';
const { _case } = Ix.iterable;
const { defer } = Ix.iterable;
const { isEmpty } = Ix.iterable;
const { single } = Ix.iterable;

test('Iterable#case no default', () => {
  let x = 1;
  let d = 'd';
  const map = new Map<number, Iterable<string>>([
    [0, ['a']],
    [1, ['b']],
    [2, ['c']],
    [3, defer(() => [d])]
  ]);
  const res = _case(() => x, map);

  expect('b').toBe(single(res));
  expect('b').toBe(single(res));

  x = 0;
  expect('a').toBe(single(res));

  x = 2;
  expect('c').toBe(single(res));

  x = 3;
  expect('d').toBe(single(res));

  d = 'e';
  expect('e').toBe(single(res));

  x = 4;
  expect(isEmpty(res)).toBeTruthy();
});

test('Iterable#case with default', () => {
  let x = 1;
  let d = 'd';
  const map = new Map<number, Iterable<string>>([
    [0, ['a']],
    [1, ['b']],
    [2, ['c']],
    [3, defer(() => [d])]
  ]);
  const res = _case(() => x, map, ['z']);

  expect('b').toBe(single(res));
  expect('b').toBe(single(res));

  x = 0;
  expect('a').toBe(single(res));

  x = 2;
  expect('c').toBe(single(res));

  x = 3;
  expect('d').toBe(single(res));

  d = 'e';
  expect('e').toBe(single(res));

  x = 4;
  expect('z').toBe(single(res));
});
