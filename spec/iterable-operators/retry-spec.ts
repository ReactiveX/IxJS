import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable.retry]);
const { concat } = Ix.iterable;
const { range } = Ix.iterable;
const { sequenceEqual } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext } from '../iterablehelpers';

test('Iterable#retry infinite no errors does not retry', ([retry]) => {
  const xs = range(0, 10);

  const res = retry(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#retry finite no errors does not retry', ([retry]) => {
  const xs = range(0, 10);

  const res = retry(xs, 2);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#retry finite eventually gives up', ([retry]) => {
  const err = new Error();
  const xs = concat(range(0, 2), _throw(err));

  const res = retry(xs, 2);
  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});
