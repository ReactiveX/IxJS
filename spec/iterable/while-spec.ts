import * as Ix from '../Ix';
const { defer } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { tap } = Ix.iterable;
const { toArray } = Ix.iterable;
const { _while } = Ix.iterable;

test('Iterable#while some', () => {
  let x = 5;
  const res = toArray(_while(() => x > 0, defer(() => tap([x], { next: () => x-- }))));

  expect(sequenceEqual(res, [5, 4, 3, 2, 1])).toBeTruthy();
});

test('Iterable#while none', () => {
  let x = 0;
  const res = toArray(_while(() => x > 0, defer(() => tap([x], { next: () => x-- }))));

  expect(sequenceEqual(res, [])).toBeTruthy();
});
