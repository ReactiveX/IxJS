import { AsyncObserver, AsyncObserverX } from './asyncobserver';
import { AsyncObservable, AsyncObservableX } from './asyncobservable';
import { AsyncSubscription } from './asyncsubscription';
import { AsyncSubscriptionX } from './subscriptions/asyncsubscriptionx';
import { CompositeAsyncSubscription } from './subscriptions/compositeasyncsubscription';
import { BinarySubscription } from './subscriptions/stablecompositeasyncsubscription';
import { SingleAssignmentAsyncSubscription } from './subscriptions/singleassignmentasyncsubscription';
import { bindCallback } from '../internal/bindcallback';

class InnerObserver<T, R> extends AsyncObserverX<R> {
  private _parent: FlatMapObserver<T, R>;
  private _inner: SingleAssignmentAsyncSubscription;

  constructor(parent: FlatMapObserver<T, R>, inner: SingleAssignmentAsyncSubscription) {
    super();
    this._parent = parent;
    this._inner = inner;
  }

  async _next(value: R) {
    await this._parent._observer.next(value);
  }

  async _error(err: any) {
    await this._parent._error(err);
  }

  async _complete() {
    await this._parent._complete();
    await this._parent._subscription.delete(this._inner);
  }
}

class FlatMapObserver<T, R> extends AsyncObserverX<T> {
  _observer: AsyncObserver<R>;
  private _selector: (value: T) => AsyncObservable<R> | Promise<AsyncObservable<R>>;
  _subscription: CompositeAsyncSubscription;
  private _count: number = 1;

  constructor(
    observer: AsyncObserver<R>,
    selector: (value: T) => AsyncObservable<R> | Promise<AsyncObservable<R>>,
    subscription: CompositeAsyncSubscription
  ) {
    super();
    this._observer = observer;
    this._selector = selector;
    this._subscription = subscription;
  }

  async _next(value: T) {
    let collection;
    try {
      collection = await this._selector(value);
    } catch (e) {
      await this._observer.error(e);
      return;
    }

    this._count++;

    const inner = new SingleAssignmentAsyncSubscription();
    await this._subscription.add(inner);
    const innerObserver = new InnerObserver<T, R>(this, inner);

    let innerSubscription;
    try {
      innerSubscription = await collection.subscribe(innerObserver);
    } catch (e) {
      await innerObserver.error(e);
      return;
    }

    await inner.assign(innerSubscription);
  }

  async _error(err: any) {
    await this._observer.error(err);
  }

  async _complete() {
    if (--this._count === 0) {
      await this._observer.complete();
    }
  }
}

class FlatMapObservable<T, R> extends AsyncObservableX<R> {
  private _source: AsyncObservable<T>;
  private _selector: (value: T) => AsyncObservable<R> | Promise<AsyncObservable<R>>;

  constructor(
    source: AsyncObservable<T>,
    selector: (value: T) => AsyncObservable<R> | Promise<AsyncObservable<R>>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async _subscribe(observer: AsyncObserver<R>): Promise<AsyncSubscription> {
    const inner = new CompositeAsyncSubscription();
    const sink = new FlatMapObserver<T, R>(observer, this._selector, inner);

    let subscription;
    try {
      subscription = await this._source.subscribe(sink);
    } catch (e) {
      await observer.error(e);
      return AsyncSubscriptionX.empty();
    }

    return new BinarySubscription(subscription, inner);
  }
}

export function flatMap<T, R>(
  source: AsyncObservable<T>,
  selector: (value: T) => AsyncObservable<R> | Promise<AsyncObservable<R>>,
  thisArg?: any
): AsyncObservableX<R> {
  return new FlatMapObservable<T, R>(source, bindCallback(selector, thisArg, 1));
}
