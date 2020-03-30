import { AsyncIterableX } from '../asynciterablex';
import { concat } from '../concat';
import { whileDo } from '../whiledo';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export function doWhile<TSource>(
  condition: (signal?: AbortSignal) => boolean | Promise<boolean>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function doWhileOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return concat(source, whileDo(source, condition));
  };
}
