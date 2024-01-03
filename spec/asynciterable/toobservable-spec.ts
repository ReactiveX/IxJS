import '../asynciterablehelpers.js';
import { symbolObservable } from 'ix/Ix.js';
import { empty, as, of, throwError, toArray, toObservable } from 'ix/asynciterable/index.js';
import { Observable as RxJSObservable, from as RxJSObservableFrom } from 'rxjs';
import { Observable, PartialObserver } from '../../src/observer.js';

test('AsyncIterable#toObservable empty', async () => {
  const xs = empty();
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (_value: number) => {
      fail = true;
    },
    error: (_err: any) => {
      fail = true;
    },
    complete: () => {
      expect(fail).toBeFalsy();
    },
  });
});

test('AsyncIterable#toObservable non-empty', async () => {
  const results: number[] = [];
  const xs = of(1, 2, 3);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (value: number) => {
      results.push(value);
    },
    error: (_err: any) => {
      fail = true;
    },
    complete: () => {
      expect(results).toEqual([1, 2, 3]);
      expect(fail).toBeFalsy();
    },
  });
});

test('AsyncIterable#toObservable error', async () => {
  const error = new Error();
  const xs = throwError(error);
  const ys = toObservable(xs);
  let fail = false;

  ys.subscribe({
    next: (_value: number) => {
      fail = true;
    },
    error: (err: any) => {
      expect(err).toEqual(error);
      expect(fail).toBeFalsy();
    },
    complete: () => {
      fail = true;
    },
  });
});

test('AsyncIterable#toObservable Symbol.observable should return same instance', () => {
  const ys = toObservable(of(1, 2, 3));
  // @ts-ignore
  expect(ys).toBe(ys[symbolObservable]());
});

test('AsyncIterable#toObservable accepts partial observers', async () => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  const actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(throwError(expectedError));

  const onNext = (val: number) => actualValues.push(val);
  const onError = (error: any) => (actualError = error);
  const onComplete = () => (completeCalled = true);

  await endOfObservable(valueObs, { next: onNext });
  try {
    await endOfObservable(errorObs, { error: onError });
  } catch (e) {
    /**/
  }
  await endOfObservable(valueObs, { complete: onComplete });

  expect(actualValues).toEqual(expectedValues);
  expect(actualError).toEqual(expectedError);
  expect(completeCalled).toBe(true);
});

test('AsyncIterable#toObservable accepts observer functions', async () => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  const actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(throwError(expectedError));

  const onNext = (val: number) => actualValues.push(val);
  const onError = (error: any) => (actualError = error);
  const onComplete = () => (completeCalled = true);

  await endOfObservable(valueObs, onNext);
  try {
    await endOfObservable(errorObs, null, onError);
  } catch (e) {
    /**/
  }
  await endOfObservable(valueObs, null, null, onComplete);

  expect(actualValues).toEqual(expectedValues);
  expect(actualError).toEqual(expectedError);
  expect(completeCalled).toBe(true);
});

test('AsyncIterable#toObservable interop with rxjs', async () => {
  const xs: number[] = [];
  const ys = RxJSObservableFrom(toObservable(of(1, 2, 3)));
  await endOfObservable(ys, (x) => xs.push(x));
  expect(xs).toEqual([1, 2, 3]);
});

test('AsyncIterable.from interop with rxjs', async () => {
  const ys = as(RxJSObservableFrom(toObservable(of(1, 2, 3))));
  const xs = await toArray(ys);
  expect(xs).toEqual([1, 2, 3]);
});

function endOfObservable<T>(
  observable: Observable<T> | RxJSObservable<T>,
  next?: PartialObserver<T> | ((x: T) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): Promise<void> {
  let reject: (x?: any) => void;
  let resolve: (x?: any) => void;
  // prettier-ignore
  const done = new Promise<void>((a, b) => { resolve = a; reject = b; });
  const wrap = (promiseFn: (x?: any) => void, originalFn: (...args: any[]) => any) => (
    ...args: any
  ) => {
    promiseFn(...args);
    originalFn(...args);
  };
  if (next && typeof next === 'object') {
    // prettier-ignore
    next.error = wrap(e => reject(e), (next.error || (() => { /**/ })).bind(next));
    // prettier-ignore
    next.complete = wrap(() => resolve(), (next.complete || (() => { /**/ })).bind(next));
  } else {
    // prettier-ignore
    // eslint-disable-next-line no-param-reassign
    error = wrap(e => reject(e), error || (() => { /**/ }));
    // prettier-ignore
    // eslint-disable-next-line no-param-reassign
    complete = wrap(() => resolve(), complete || (() => { /**/ }));
  }

  observable.subscribe(<any>next, <any>error, <any>complete);

  return done;
}
