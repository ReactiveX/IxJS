import { toObserver } from '../util/toobserver';
import { observable as symbolObservable } from '../observer';
import { Observable, PartialObserver } from '../observer';
import { Subscription } from '../subscription';

class BooleanSubscription implements Subscription {
  public isUnsubscribed = false;

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
    next?: PartialObserver<TSource> | ((value: TSource) => any) | null,
    error?: ((err: any) => any) | null,
    complete?: (() => any) | null
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
        .catch((err) => {
          if (!subscription.isUnsubscribed) {
            observer.error(err);
          }
        });
    };
    f();

    return subscription;
  }
}

/**
 * Converts the async-iterable sequence to an observable.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {AsyncIterable<TSource>} source The async-iterable to convert to an observable.
 * @returns {Observable<TSource>} The observable containing the elements from the async-iterable.
 */
export function toObservable<TSource>(source: AsyncIterable<TSource>): Observable<TSource> {
  return new AsyncIterableObservable<TSource>(source);
}
