import { IterableX } from '../iterablex';
import { concatStatic } from '../concat';
import { _while } from '../while';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function doWhile<TSource>(condition: () => boolean): MonoTypeOperatorFunction<TSource> {
  return function doWhileOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return concatStatic(source, _while(condition, source));
  };
}
