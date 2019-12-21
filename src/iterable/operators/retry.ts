import { IterableX } from '../iterablex';
import { repeatValue } from '../repeatvalue';
import { catchAll } from '../catcherror';
import { MonoTypeOperatorFunction } from '../../interfaces';

export function retry<TSource>(count: number = -1): MonoTypeOperatorFunction<TSource> {
  return function retryOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return catchAll<TSource>(repeatValue<Iterable<TSource>>(source, count));
  };
}
