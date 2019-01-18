import * as Ix from '../Ix';
const { _throw } = Ix.iterable;

test('Iterable#throw throws', () => {
  const xs = _throw<number>(new Error());

  const it = xs[Symbol.iterator]();
  expect(() => it.next()).toThrow();
});
