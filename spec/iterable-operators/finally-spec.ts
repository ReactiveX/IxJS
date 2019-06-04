import { hasNext, noNext } from '../iterablehelpers';
import { finalize } from 'ix/iterable/operators';
import { range, throwError } from 'ix/iterable';

test('Iterable#finally defers behavior', () => {
  let done = false;

  const xs = finalize(() => (done = true))(range(0, 2));
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

test('Iterable#finally calls even with error', () => {
  let done = false;

  const err = new Error();
  const xs = finalize(() => (done = true))(throwError(err));
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
