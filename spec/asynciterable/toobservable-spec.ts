import { empty, from, of, throwError, toArray, toObservable } from 'ix/asynciterable';
import { Observable as RxJSObservable } from 'rxjs';
import { Observable, PartialObserver } from '../../src/observer';

test('AsyncIterable#toObservable empty', async () => {
  const xs = empty<number>();
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
    }
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
    }
  });
});

test('AsyncIterable#toObservable error', async () => {
  const error = new Error();
  const xs = throwError<number>(error);
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
    }
  });
});

test('AsyncIterable#toObservable Symbol.observable should return same instance', async () => {
  const ys = toObservable(of(1, 2, 3));
  // @ts-ignore
  expect(ys).toBe(ys[symbolObservable]());
});

test('AsyncIterable#toObservable accepts partial observers', async () => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  let actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(throwError<number>(expectedError));

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
  expect(completeCalled).toEqual(true);
});

test('AsyncIterable#toObservable accepts observer functions', async () => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  let actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(throwError<number>(expectedError));

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
  expect(completeCalled).toEqual(true);
});

test('AsyncIterable#toObservable interop with rxjs', async () => {
  const xs: number[] = [];
  const ys = RxJSObservable.from(toObservable(of(1, 2, 3)));
  await endOfObservable(ys, x => xs.push(x));
  expect(xs).toEqual([1, 2, 3]);
});

test('AsyncIterable.from interop with rxjs', async () => {
  const ys = from(RxJSObservable.from(toObservable(of(1, 2, 3))));
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
    next.error = wrap(e => reject(e),(next.error || (() => { /**/ })).bind(next));
    // prettier-ignore
    next.complete = wrap(() => resolve(), (next.complete || (() => { /**/ })).bind(next));
  } else {
    // prettier-ignore
    error = wrap(e => reject(e),error || (() => { /**/ }));
    // prettier-ignore
    complete = wrap(() => resolve(),complete || (() => { /**/ }));
  }

  observable.subscribe(<any>next, <any>error, <any>complete);

  return done;
}
