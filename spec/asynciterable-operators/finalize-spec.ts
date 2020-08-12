import { hasNext, noNext } from '../asynciterablehelpers';
import { range, throwError } from 'ix/asynciterable';
import { finalize } from 'ix/asynciterable/operators';

test('AsyncIterable#finally defers behavior', async () => {
  let done = false;

  const xs = range(0, 2).pipe(
    finalize(async () => {
      done = true;
    })
  );
  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();
  expect(done).toBeFalsy();

  await hasNext(it, 0);
  expect(done).toBeFalsy();

  await hasNext(it, 1);
  expect(done).toBeFalsy();

  await noNext(it);
  expect(done).toBeTruthy();
});

test('AsyncIterable#finally calls even with error', async () => {
  let done = false;

  const err = new Error();
  const xs = throwError(err).pipe(
    finalize(async () => {
      done = true;
    })
  );
  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();
  expect(done).toBeFalsy();

  try {
    await hasNext(it, 0);
  } catch (e) {
    expect(e).toEqual(err);
  }

  expect(done).toBeTruthy();
});
