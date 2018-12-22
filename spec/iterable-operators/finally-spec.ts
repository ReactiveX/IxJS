import * as Ix from '../Ix';
import { testOperator } from '../iterablehelpers';
const test = testOperator([Ix.iterable._finally]);
const { range } = Ix.iterable;
const { _throw } = Ix.iterable;
import { hasNext, noNext } from '../iterablehelpers';

test('Iterable#finally defers behavior', ([_finally]) => {
  let done = false;

  const xs = _finally(range(0, 2), () => (done = true));
  expect(done).toBeFalsy();

  const it = xs[Symbol.iterator]();
  expect(done).toBeFalsy();

  hasNext(it, 0);
  expect(done).toBeFalsy();

  hasNext(it, 1);
  expect(done).toBeFalsy();

  noNext(it);
  expect(done).toBeTruthy();
});

test('Iterable#finally calls even with error', ([_finally]) => {
  let done = false;

  const err = new Error();
  const xs = _finally(_throw(err), () => (done = true));
  expect(done).toBeFalsy();

  const it = xs[Symbol.iterator]();
  expect(done).toBeFalsy();

  try {
    hasNext(it, 0);
  } catch (e) {
    expect(err).toEqual(e);
  }

  expect(done).toBeTruthy();
});
