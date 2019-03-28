import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable/asynciterablex';
import { FinallyAsyncIterable } from '../finally';

export function _finally<TSource>(
  action: () => any | Promise<any>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function finallyOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FinallyAsyncIterable<TSource>(source, action);
  };
}
