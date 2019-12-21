import { AsyncIterableX } from '../asynciterablex';
import { concat } from '../concat';
import { whileDo } from '../whiledo';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

export function doWhile<TSource>(
  condition: () => boolean | Promise<boolean>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function doWhileOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return concat(source, whileDo(condition, source));
  };
}
