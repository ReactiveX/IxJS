import { observable as symbolObservable } from '../observer';
import { Observable, Observer, PartialObserver } from '../observer';
import { Subscription } from '../subscription';

const noop = (_?: any) => {
  /**/
};

function toObserver<T>(
  next?: PartialObserver<T> | ((value: T) => void) | null,
  error?: ((err: any) => void) | null,
  complete?: (() => void) | null
): Observer<T> {
  if (next && typeof next === 'object') {
    const observer = <any>next;
    return {
      next: (observer.next || noop).bind(observer),
      error: (observer.error || noop).bind(observer),
      complete: (observer.complete || noop).bind(observer)
    };
  } else {
    return {
      next: typeof next === 'function' ? next : noop,
      error: typeof error === 'function' ? error : noop,
      complete: typeof complete === 'function' ? complete : noop
    };
  }
}

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

  [symbolObservable](): Observable<TSource> {
    return this;
  }
  subscribe(
    next?: PartialObserver<TSource> | ((value: TSource) => void) | null,
    error?: ((err: any) => void) | null,
    complete?: (() => void) | null
  ) {
    const observer = toObserver(next, error, complete);
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
