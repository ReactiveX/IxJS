import symbolObservable from 'symbol-observable';
import { Observable, PartialObserver } from '../observer';
import { Subscription } from '../subscription';

const noop = (_?: any) => {
  /**/
};

class BooleanSubscription implements Subscription {
  public isUnsubscribed: boolean = false;

  unsubscribe() {
    this.isUnsubscribed = true;
  }
}

class AsyncIterableObservable<TSource> implements Observable<TSource> {
  private _source: AsyncIterable<TSource>;

  constructor(source: AsyncIterable<TSource>) {
    this._source = source;
  }

  [symbolObservable]() {
    return this;
  }
  subscribe(
    observerOrNext?: PartialObserver<TSource> | ((value: TSource) => void),
    error?: (err: any) => void,
    complete?: () => void
  ) {
    const observer =
      typeof observerOrNext !== 'function'
        ? { next: noop, error: noop, complete: noop, ...observerOrNext }
        : { next: observerOrNext || noop, error: error || noop, complete: complete || noop };
    const subscription = new BooleanSubscription();

    const it = this._source[Symbol.asyncIterator]();
    const f = () => {
      it.next()
        .then(({ value, done }) => {
          if (!subscription.isUnsubscribed) {
            if (done) {
              observer.complete();
            } else {
              observer.next(value);
              f();
            }
          }
        })
        .catch(err => {
          if (!subscription.isUnsubscribed) {
            observer.error(err);
          }
        });
    };
    f();

    return subscription;
  }
}

export function toObservable<TSource>(source: AsyncIterable<TSource>): Observable<TSource> {
  return new AsyncIterableObservable<TSource>(source);
}
