import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { FinallyAsyncIterable } from '../finally';

export function _finally<TSource>(
  action: () => void | Promise<void>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function finallyOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FinallyAsyncIterable<TSource>(source, action);
  };
}
