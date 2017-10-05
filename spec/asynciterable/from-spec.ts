import * as Ix from '../Ix';
import * as test from 'tape-async';
const { from } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

test('AsyncIterable#from from promise list', async t => {
  const xs: Iterable<Promise<number>> = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

async function* getData() {
  yield 1;
  yield 2;
  yield 3;
}

test('AsyncIterable#from from async generator', async t => {
  const xs = getData();
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array/iterable', async t => {
  const xs = [1, 2, 3];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await hasNext(t, it, 3);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array/iterable with selector', async t => {
  const xs = [1, 2, 3];
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from async generator with selector', async t => {
  const xs = getData();
  const res = from(xs, async (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 1);
  await hasNext(t, it, 3);
  await hasNext(t, it, 5);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from empty array/iterable', async t => {
  const xs: number[] = [];
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array-like', async t => {
  const xs = { length: 3 };
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await hasNext(t, it, undefined);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from array-like with selector', async t => {
  const xs = { length: 3 };
  const res = from(xs, (x, i) => i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 0);
  await hasNext(t, it, 1);
  await hasNext(t, it, 2);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from promise', async t => {
  const xs = Promise.resolve(42);
  const res = from(xs);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#from from promise with selector', async t => {
  const xs = Promise.resolve(42);
  const res = from(xs, (x, i) => x + i);

  const it = res[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
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
    // tslint:disable-next-line:no-empty
  }
}

class TestObservable<T> implements Observable<T> {
  private _subscribe: (observer: Observer<T>) => Subscription;

  constructor(subscribe: (observer: Observer<T>) => Subscription) {
    this._subscribe = subscribe;
  }

  subscribe(observer: Observer<T>) {
    return this._subscribe(observer);
  }
}

test('AsyncIterable#fromObservable with completion', async t => {
  const xs = new TestObservable<number>(obs => {
    obs.next(42);
    obs.complete();
    return new EmptySubscription();
  });
  const ys = from(xs);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#fromObservable with completion', async t => {
  const xs = new TestObservable<number>(obs => {
    obs.next(42);
    obs.complete();
    return new EmptySubscription();
  });
  const ys = from(xs, (x, i) => x + i);

  const it = ys[Symbol.asyncIterator]();
  await hasNext(t, it, 42);
  await noNext(t, it);
  t.end();
});

test('AsyncIterable#fromObservable with error', async t => {
  const err = new Error();
  const xs = new TestObservable<number>(obs => {
    obs.error(err);
    return new EmptySubscription();
  });
  const ys = from(xs);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});