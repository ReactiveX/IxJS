import { AsyncIterableX } from '../../asynciterable/asynciterablex.js';
import { tap } from '../../asynciterable/operators/tap.js';
import { PartialAsyncObserver } from '../../observer.js';

/** @ignore */
export function tapProto<T>(observer: PartialAsyncObserver<T>): AsyncIterableX<T>;
/** @ignore */
export function tapProto<T>(
  next?: ((value: T) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): AsyncIterableX<T>;
/** @ignore */
export function tapProto<T>(
  this: AsyncIterableX<T>,
  observerOrNext?: PartialAsyncObserver<T> | ((value: T) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): AsyncIterableX<T> {
  return tap<T>(observerOrNext as any, error, complete)(this);
}

AsyncIterableX.prototype.tap = tapProto;

declare module '../../asynciterable/asynciterablex' {
  interface AsyncIterableX<T> {
    tap: typeof tapProto;
  }
}
