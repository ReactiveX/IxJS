import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { toObservable } from '../../asynciterable/toobservable';
import { Observable } from '../../observer';

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
