import { AsyncIterableX } from './asynciterablex';
import { concatStatic } from './concat';
import { _while } from './while';

export function doWhile<TSource>(
  condition: () => boolean | Promise<boolean>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function doWhileOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return concatStatic(source, _while(condition, source));
  };
}
