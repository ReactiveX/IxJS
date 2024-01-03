import { IterableX } from '../../iterable/iterablex.js';
import { tap } from '../../iterable/operators/tap.js';
import { PartialObserver } from '../../observer.js';

/**
 * @ignore
 */
export function tapProto<TSource>(
  this: IterableX<TSource>,
  observer: PartialObserver<TSource>
): IterableX<TSource>;
export function tapProto<TSource>(
  this: IterableX<TSource>,
  next?: ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): IterableX<TSource>;
export function tapProto<TSource>(
  this: IterableX<TSource>,
  observerOrNext?: PartialObserver<TSource> | ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): IterableX<TSource> {
  return tap<TSource>(observerOrNext as any, error, complete)(this);
}

IterableX.prototype.tap = tapProto;

declare module '../../iterable/iterablex' {
  interface IterableX<T> {
    tap: typeof tapProto;
  }
}
