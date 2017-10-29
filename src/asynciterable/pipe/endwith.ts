import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { EndWithAsyncIterable } from '../endwith';

export function endWith<TSource>(
  ...args: TSource[]
): MonoTypeOperatorAsyncFunction<TSource> {
  return function endsWithOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new EndWithAsyncIterable<TSource>(source, args);
  };
}
