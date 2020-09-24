import { PartialAsyncObserver, AsyncSubscription } from '../interfaces';
import { AsyncObservableX } from './asyncobservablex';

class AnonymousAsyncObservable<T> extends AsyncObservableX<T> {
  private _fn: (
    observer: PartialAsyncObserver<T>,
    signal?: AbortSignal
  ) => Promise<AsyncSubscription>;

  constructor(
    fn: (observer: PartialAsyncObserver<T>, signal?: AbortSignal) => Promise<AsyncSubscription>
  ) {
    super();
    this._fn = fn;
  }

  _subscribeAsync(observer: PartialAsyncObserver<T>, signal?: AbortSignal) {
    return this._fn(observer, signal);
  }
}

export function create<T>(
  fn: (observer: PartialAsyncObserver<T>, signal?: AbortSignal) => Promise<AsyncSubscription>
) {
  return new AnonymousAsyncObservable<T>(fn);
}
