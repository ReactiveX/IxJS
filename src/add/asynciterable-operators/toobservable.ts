import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { toObservable } from '../../asynciterable/toobservable.js';
import { Observable } from '../../observer.js';

/**
 * @ignore
 */
export function toObservableProto<TSource>(this: AsyncIterableX<TSource>): Observable<TSource> {
  return toObservable(this);
}

AsyncIterableX.prototype.toObservable = toObservableProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    toObservable: typeof toObservableProto;
  }
}
