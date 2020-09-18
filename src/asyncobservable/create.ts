import { PartialAsyncObserver, AsyncSubscription } from '../interfaces';
import { AsyncObservableX } from './asyncobservablex';

class AnonymousAsyncObservable<T> extends AsyncObservableX<T> {
  private _fn: (observer: PartialAsyncObserver<T>) => Promise<AsyncSubscription>;

  constructor(fn: (observer: PartialAsyncObserver<T>) => Promise<AsyncSubscription>) {
    super();
    this._fn = fn;
  }

  _subscribeAsync(observer: PartialAsyncObserver<T>) {
    return this._fn(observer);
  }
}

export function create<T>(fn: (observer: PartialAsyncObserver<T>) => Promise<AsyncSubscription>) {
  return new AnonymousAsyncObservable<T>(fn);
}
