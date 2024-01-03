import { hasNext, hasErr, noNext, delayError, delayValue } from '../asynciterablehelpers.js';
import { debounce, finalize } from 'ix/asynciterable/operators/index.js';
import { as } from 'ix/asynciterable/index.js';
import { AbortError } from 'ix/Ix.js';

test(
  'AsyncIterable#debounce none drop',
  async () => {
    const xs = async function* () {
      yield await delayValue(1, 100);
      yield await delayValue(2, 100);
      yield await delayValue(3, 100);
    };
    const ys = as(xs()).pipe(debounce(50));

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasNext(it, 2);
    await hasNext(it, 3);
    await noNext(it);
  },
  10 * 1000
);

test(
  'AsyncIterable#debounce some drop',
  async () => {
    const xs = async function* () {
      yield await delayValue(1, 200);
      yield await delayValue(2, 400);
      yield await delayValue(3, 200);
    };
    const ys = as(xs()).pipe(debounce(300));

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasNext(it, 3);
    await noNext(it);
  },
  10 * 1000
);

test(
  'AsyncIterable#debounce cancels on abort',
  async () => {
    const xs = async function* () {
      yield await delayValue(1, 200);
      yield await delayValue(2, 400);
      yield await delayValue(3, 200);
    };
    const ys = as(xs()).pipe(debounce(300));
    const controller = new AbortController();
    const it = ys[Symbol.asyncIterator](controller.signal);
    await hasNext(it, 1);
    setImmediate(() => controller.abort());
    await hasErr(it, AbortError);
    await noNext(it);
  },
  10 * 1000
);

test(
  'AsyncIterable#debounce triggers finalize on error',
  async () => {
    let done = false;
    const e = new Error();
    const xs = async function* () {
      yield await delayValue(1, 100);
      yield await delayError(e, 100);
      yield await delayValue(3, 100);
    };
    const ys = as(xs()).pipe(
      finalize(() => {
        done = true;
      }),
      debounce(50)
    );

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasErr(it, e);
    await noNext(it);
    expect(done).toBeTruthy();
  },
  10 * 1000
);

test(
  'AsyncIterable#debounce triggers finalize on complete',
  async () => {
    let done = false;
    const xs = async function* () {
      yield await delayValue(1, 200);
      yield await delayValue(2, 400);
      yield await delayValue(3, 200);
    };
    const ys = as(xs()).pipe(
      finalize(() => {
        done = true;
      }),
      debounce(300)
    );

    const it = ys[Symbol.asyncIterator]();
    await hasNext(it, 1);
    await hasNext(it, 3);
    await noNext(it);
    expect(done).toBeTruthy();
  },
  10 * 1000
);
