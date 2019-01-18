import * as Ix from '../Ix';
const { _for } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { toArray } = Ix.iterable;

test('Iterable#for behavior', () => {
  const res = toArray(_for([1, 2, 3], x => range(0, x)));
  expect(sequenceEqual(res, [0, 0, 1, 0, 1, 2])).toBeTruthy();
});
