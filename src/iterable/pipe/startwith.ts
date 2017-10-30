import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { StartWithIterable } from '../startwith';

export function startWith<TSource>(...args: TSource[]): MonoTypeOperatorFunction<TSource> {
  return function startWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new StartWithIterable<TSource>(source, args);
  };
}
