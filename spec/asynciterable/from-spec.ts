import { hasNext, noNext, toObserver } from '../asynciterablehelpers.js';
import { setInterval, clearInterval } from 'timers';
import { PartialObserver } from '../../src/observer.js';
import { defer, from } from 'ix/asynciterable/index.js';
import { AbortError } from 'ix/Ix.js';
import { withAbort } from 'ix/asynciterable/operators/index.js';

function throwIfAborted(signal?: AbortSignal) {
  if (signal && signal.aborted) {
    throw new AbortError();
  }
}

test('AsyncIterable#from from promise list', async () => {
  const xs: Iterable<Promise<number>> = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

async function* getData(signal?: AbortSignal) {
  throwIfAborted(signal);
  yield 1;
  throwIfAborted(signal);
  yield 2;
  throwIfAborted(signal);
  yield 3;
}

test('AsyncIterable#from from async generator', async () => {
  const xs = getData();
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#from from async iterator', async () => {
  const xs = getData();
  const res = from({ next: () => xs.next() });

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#from from array/iterable', async () => {
  const xs = [1, 2, 3];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 2);
  await hasNext(it, 3);
  await noNext(it);
});

test('AsyncIterable#from from array/iterable with selector', async () => {
  const xs = [1, 2, 3];
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await hasNext(it, 5);
  await noNext(it);
});

test('AsyncIterable#from from async generator with selector', async () => {
  const xs = getData();
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 1);
  await hasNext(it, 3);
  await hasNext(it, 5);
  await noNext(it);
});

test('AsyncIterable#from from empty array/iterable', async () => {
  const xs: number[] = [];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await noNext(it);
});

test('AsyncIterable#from from array-like', async () => {
  const xs = { length: 3 };
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await hasNext(it, undefined);
  await noNext(it);
});

test('AsyncIterable#from from array-like with selector', async () => {
  const xs = { length: 3 };
  const res = from(xs, (_, i) => i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#from from promise', async () => {
  const xs = Promise.resolve(42);
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#from from promise with selector', async () => {
  const xs = Promise.resolve(42);
  const res = from(xs, (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#from from with non-iterable throws', () => {
  expect(() => from({} as any)).toThrow();
});

test('AsyncIterable#from from async generator with AbortSignal', async () => {
  const abortController = new AbortController();
  const xs = getData();
  const res = from(xs);

  const it = res[Symbol.asyncIterator](abortController.signal);
  await hasNext(it, 1);
  await hasNext(it, 2);
  abortController.abort();
  await expect(it.next()).rejects.toBeInstanceOf(AbortError);
});

test('AsyncIterable#from from defer with AbortSignal', async () => {
  const abortController = new AbortController();
  const xs = defer((signal) => {
    expect(signal).toBeInstanceOf(AbortSignal);
    return getData(signal);
  });
  const res = from(xs);

  const it = res[Symbol.asyncIterator](abortController.signal);
  await hasNext(it, 1);
  await hasNext(it, 2);
  abortController.abort();
  await expect(it.next()).rejects.toBeInstanceOf(AbortError);
});

interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

interface Subscription {
  unsubscribe: () => void;
}

interface Observable<T> {
  subscribe: (observer: Observer<T>) => Subscription;
}

class EmptySubscription implements Subscription {
  unsubscribe() {
    // eslint-disable-next-line no-empty
  }
}

class TestObservable<T> implements Observable<T> {
  private _subscribe: (observer: Observer<T>) => Subscription;

  constructor(subscribe: (observer: Observer<T>) => Subscription) {
    this._subscribe = subscribe;
  }

  subscribe(
    next?: PartialObserver<T> | ((value: T) => void) | null,
    error?: ((err: any) => void) | null,
    complete?: (() => void) | null
  ) {
    return this._subscribe(toObserver(next, error, complete));
  }
}

test('AsyncIterable#fromObservable with completion', async () => {
  const xs = new TestObservable<number>((obs) => {
    obs.next(42);
    obs.complete();
    return new EmptySubscription();
  });
  const ys = from(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#fromObservable with map selector and completion', async () => {
  const xs = new TestObservable<number>((obs) => {
    obs.next(42);
    obs.complete();
    return new EmptySubscription();
  });
  const ys = from(xs, (x, i) => x + i);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 42);
  await noNext(it);
});

test('AsyncIterable#fromObservable with multiple', async () => {
  const xs = new TestObservable<number>((obs) => {
    let count = 0;
    const interval = setInterval(() => {
      obs.next(count++);
      if (count === 3) {
        clearInterval(interval);
        obs.complete();
      }
    }, 10);
    return new EmptySubscription();
  });
  const ys = from(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 1);
  await hasNext(it, 2);
  await noNext(it);
});

test('AsyncIterable#fromObservable multiple with selector', async () => {
  const xs = new TestObservable<number>((obs) => {
    let count = 0;
    const interval = setInterval(() => {
      obs.next(count++);
      if (count === 3) {
        clearInterval(interval);
        obs.complete();
      }
    }, 10);
    return new EmptySubscription();
  });
  const ys = from(xs, (x, i) => x + i);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(it, 0);
  await hasNext(it, 2);
  await hasNext(it, 4);
  await noNext(it);
});

test('AsyncIterable#fromObservable with error', async () => {
  const err = new Error();
  const xs = new TestObservable<number>((obs) => {
    obs.error(err);
    return new EmptySubscription();
  });
  const ys = from(xs);

  const it = ys[Symbol.asyncIterator]();
  await expect(it.next()).rejects.toThrow(err);
});

test('AsyncIterable#fromObservable with abort while waiting', async () => {
  let unsubscribed = false;

  const xs = new TestObservable<number>((obs) => {
    obs.next(0);

    return {
      unsubscribe() {
        unsubscribed = true;
      },
    };
  });

  const abortController = new AbortController();

  const ys = from(xs).pipe(withAbort(abortController.signal));
  const it = ys[Symbol.asyncIterator]();

  await hasNext(it, 0);

  setTimeout(() => {
    abortController.abort();
  }, 100);

  await expect(it.next()).rejects.toBeInstanceOf(AbortError);
  expect(unsubscribed).toBe(true);
});

test('AsyncIterable#fromObservable with abort while queueing', async () => {
  let unsubscribed = false;

  const xs = new TestObservable<number>((obs) => {
    obs.next(0);
    obs.next(1);
    obs.next(2);

    return {
      unsubscribe() {
        unsubscribed = true;
      },
    };
  });

  const abortController = new AbortController();

  const ys = from(xs).pipe(withAbort(abortController.signal));
  const it = ys[Symbol.asyncIterator]();

  await hasNext(it, 0);

  abortController.abort();

  await expect(it.next()).rejects.toBeInstanceOf(AbortError);
  expect(unsubscribed).toBe(true);
});
