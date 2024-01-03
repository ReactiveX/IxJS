import { hasNext } from '../iterablehelpers.js';
import { retry } from 'ix/iterable/operators/index.js';
import { concat, range, throwError, sequenceEqual } from 'ix/iterable/index.js';

test('Iterable#retry infinite no errors does not retry', () => {
  const xs = range(0, 10);

  const res = retry()(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#retry finite no errors does not retry', () => {
  const xs = range(0, 10);

  const res = retry(2)(xs);
  expect(sequenceEqual(res, xs)).toBeTruthy();
});

test('Iterable#retry finite eventually gives up', () => {
  const err = new Error();
  const xs = concat(range(0, 2), throwError(err));

  const res = retry(2)(xs);
  const it = res[Symbol.iterator]();
  hasNext(it, 0);
  hasNext(it, 1);
  hasNext(it, 0);
  hasNext(it, 1);
  expect(() => it.next()).toThrow();
});
