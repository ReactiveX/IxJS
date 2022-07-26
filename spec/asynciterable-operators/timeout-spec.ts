import { hasNext, hasErr, noNext, delayValue } from '../asynciterablehelpers';
import { timeout, finalize } from 'ix/asynciterable/operators';
import { as } from 'ix/asynciterable';
import { TimeoutError } from 'ix/asynciterable/operators/timeout';

test('AsyncIterable#timeout drops none', async () => {
  const xs = async function* () {
    yield await delayValue(1, 50);
    yield await delayValue(2, 50);
    yield await delayValue(3, 50);
  };
  const ys = as(xs()).pipe(timeout(100));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#timeout throws when delayed', async () => {
  const xs = async function* () {
    yield await delayValue(1, 50);
    yield await delayValue(2, 200);
  };
  const ys = as(xs()).pipe(timeout(100));

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasErr(it, TimeoutError);
  await noNext(it);
});

test('AsyncIterable#timeout triggers finalize', async () => {
  let done = false;
  const xs = async function* () {
    yield await delayValue(1, 50);
    yield await delayValue(2, 200);
  };
  const ys = as(xs()).pipe(
    finalize(() => {
      done = true;
    }),
    timeout(100)
  );

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasErr(it, TimeoutError);
  await noNext(it);
  expect(done).toBeTruthy();
});
