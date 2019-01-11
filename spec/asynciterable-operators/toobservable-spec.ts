import * as Ix from '../Ix';
const { symbolObservable } = (Ix as any).default;
import { Observable as RxJSObservable } from 'rxjs';
import { Observable, PartialObserver } from '../../src/observer';
import { testOperator } from '../asynciterablehelpers';
const test = testOperator([Ix.asynciterable.toObservable]);
const { of, from } = Ix.AsyncIterable;
const { empty, _throw, toArray } = Ix.asynciterable;

test('AsyncIterable#toObservable empty', async ([toObservable]) => {
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

test('AsyncIterable#toObservable non-empty', async ([toObservable]) => {
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

test('AsyncIterable#toObservable error', async ([toObservable]) => {
  const error = new Error();
  const xs = _throw<number>(error);
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

test('AsyncIterable#toObservable Symbol.observable should return same instance', async ([
  toObservable
]) => {
  const ys = toObservable(of(1, 2, 3));
  // @ts-ignore
  expect(ys).toBe(ys[symbolObservable]());
});

test('AsyncIterable#toObservable accepts partial observers', async ([toObservable]) => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  let actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(_throw<number>(expectedError));

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

test('AsyncIterable#toObservable accepts observer functions', async ([toObservable]) => {
  const expectedValues = [1, 2, 3];
  const expectedError = new Error();

  let actualValues: number[] = [];
  let actualError: any = null;
  let completeCalled = false;

  const valueObs = toObservable(of(1, 2, 3));
  const errorObs = toObservable(_throw<number>(expectedError));

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

test('AsyncIterable#toObservable interop with rxjs', async ([toObservable]) => {
  const xs: number[] = [];
  const ys = RxJSObservable.from(toObservable(of(1, 2, 3)));
  await endOfObservable(ys, x => xs.push(x));
  expect(xs).toEqual([1, 2, 3]);
});

test('AsyncIterable.from interop with rxjs', async ([toObservable]) => {
  const ys = from(RxJSObservable.from(toObservable(of(1, 2, 3))));
  const xs = await toArray(ys);
  expect(xs).toEqual([1, 2, 3]);
});

function endOfObservable<T>(
  observable: Observable<T> | RxJSObservable<T>,
  next?: PartialObserver<T> | ((x: T) => void) | null,
  error?: ((err: any) => void) | null,
  complete?: (() => void) | null
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
