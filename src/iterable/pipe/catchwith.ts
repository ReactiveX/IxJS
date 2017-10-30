import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { CatchWithIterable } from '../catchwith';

export function catchWith<TSource>(
  handler: (error: any) => Iterable<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function catchWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new CatchWithIterable<TSource>(source, handler);
  };
}
