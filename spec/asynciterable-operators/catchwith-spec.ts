import * as Ix from '../Ix';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.catchWith]);
const { of } = Ix.AsyncIterable;
const { range } = Ix.asynciterable;
const { sequenceEqual } = Ix.asynciterable;
const { single } = Ix.asynciterable;
const { _throw } = Ix.asynciterable;

test('AsyncIterable#catchWith error catches', async ([catchWith]) => {
  const err = new Error();
  const res = await single(
    catchWith(_throw(err), async e => {
      expect(err).toEqual(e);
      return of(42);
    })
  );
  expect(42).toBe(res);
});

test('AsyncIterable#catchWith no error misses', async ([catchWith]) => {
  const xs = range(0, 10);
  const res = catchWith(xs, async _ => of(42));
  expect(sequenceEqual(res, xs)).resolves.toBeTruthy();
});
