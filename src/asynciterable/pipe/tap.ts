import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { TapAsyncIterable } from '../tap';
import { PartialAsyncObserver } from '../../observer';

export function tap<TSource>(
  observer: PartialAsyncObserver<TSource>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function tapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TapAsyncIterable<TSource>(source, observer);
  };
}
