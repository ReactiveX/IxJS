import { IterableX } from '../iterablex';
import { concat } from '../concat';
import { whileDo } from '../whiledo';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function doWhile<TSource>(condition: () => boolean): MonoTypeOperatorFunction<TSource> {
  return function doWhileOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return concat(source, whileDo(condition, source));
  };
}
