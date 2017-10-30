import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { EndWithIterable } from '../endwith';

export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorFunction<TSource> {
  return function endsWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new EndWithIterable<TSource>(source, args);
  };
}
