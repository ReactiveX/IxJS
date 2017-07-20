import * as Ix from '../Ix';
import * as test from 'tape';
const { fromObservable } = Ix.asynciterable;
import { hasNext, noNext } from '../asynciterablehelpers';

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
  const ys = fromObservable(xs);

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
  const ys = fromObservable(xs);

  const it = ys[Symbol.asyncIterator]();
  try {
    await it.next();
  } catch (e) {
    t.same(err, e);
  }

  t.end();
});