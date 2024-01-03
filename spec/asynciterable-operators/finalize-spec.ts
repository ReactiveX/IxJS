import { hasNext, hasErr, noNext } from '../asynciterablehelpers.js';
import { range, throwError } from 'ix/asynciterable/index.js';
import { flatMap, finalize, tap } from 'ix/asynciterable/operators/index.js';

test('AsyncIterable#finalize defers behavior', async () => {
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

test('AsyncIterable#finalize calls even with error', async () => {
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

  await hasErr(it, err);

  expect(done).toBeTruthy();
});

test('AsyncIterable#finalize calls with downstream error', async () => {
  let done = false;

  const err = new Error();
  const xs = range(0, 2).pipe(
    finalize(async () => {
      done = true;
    }),
    tap(async () => {
      throw err;
    })
  );

  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();

  expect(done).toBeFalsy();

  await hasErr(it, err);

  expect(done).toBeTruthy();
});

test('AsyncIterable#finalize calls with downstream error from flattening', async () => {
  let done = false;
  // let srcValues = [] as number[];

  const err = new Error();
  const xs = range(0, 4).pipe(
    finalize(async () => {
      done = true;
    }),
    flatMap(async (x) => {
      // srcValues.push(x);
      if (x === 1) {
        return throwError(err);
      }
      return [x];
    })
  );

  expect(done).toBeFalsy();

  const it = xs[Symbol.asyncIterator]();

  expect(done).toBeFalsy();

  await hasNext(it, 0);
  await hasErr(it, err);
  await noNext(it);

  expect(done).toBeTruthy();
  // The source will yield one more value after the throwError(err),
  // because the internal Promise.race([outer, inner]) call resolves
  // to the last outer value before the inner error. This is an artifact
  // of the JS Promise scheduler's breadth-first scheduling behavior, not
  // a bug in IxJS.
  // TODO: This is broken in google-closure-compiler?
  // expect(srcValues).toEqual([0, 1, 2]);
});
