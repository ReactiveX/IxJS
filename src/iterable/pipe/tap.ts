import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { TapIterable } from '../tap';
import { PartialObserver } from '../../observer';

export function tap<TSource>(
  observer: PartialObserver<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function tapOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new TapIterable<TSource>(source, observer);
  };
}
