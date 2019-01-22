import { AsyncIterableX } from '../asynciterablex';
import { repeatValue } from '../../iterable/repeatvalue';
import { CatchAllAsyncIterable } from '../catch';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export function retry<TSource>(count: number = -1): MonoTypeOperatorAsyncFunction<TSource> {
  return function retryOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new CatchAllAsyncIterable<TSource>(repeatValue<AsyncIterable<TSource>>(source, count));
  };
}
