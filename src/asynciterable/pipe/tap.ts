import { toObserver } from '../../internal/toobserver';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TapAsyncIterable } from '../tap';
import { PartialAsyncObserver } from '../../observer';

export function tap<TSource>(
  observer: PartialAsyncObserver<TSource>
): MonoTypeOperatorAsyncFunction<TSource>;

export function tap<TSource>(
  next?: ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorAsyncFunction<TSource>;

export function tap<TSource>(
  observerOrNext?: PartialAsyncObserver<TSource> | ((value: TSource) => any) | null,
  error?: ((err: any) => any) | null,
  complete?: (() => any) | null
): MonoTypeOperatorAsyncFunction<TSource> {
  return function tapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TapAsyncIterable<TSource>(source, toObserver(observerOrNext, error, complete));
  };
}
