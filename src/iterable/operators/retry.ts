import { IterableX } from '../iterablex';
import { repeatValue } from '../repeatvalue';
import { _catchAll } from '../catch';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function retry<TSource>(count: number = -1): MonoTypeOperatorFunction<TSource> {
  return function retryOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return _catchAll<TSource>(repeatValue<Iterable<TSource>>(source, count));
  };
}
