import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.catchWith]);
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { single } = Ix.iterable;
const { _throw } = Ix.iterable;

test('Iterable#catchWith error catches', ([catchWith]) => {
  const err = new Error();
  const res = single(
    catchWith(_throw(err), e => {
      expect(err).toEqual(e);
      return [42];
    })
  );
  expect(42).toBe(res);
});

test('Iterable#catchWith no error misses', ([catchWith]) => {
  const xs = range(0, 10);
  const res = catchWith(xs, _ => [42]);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});
