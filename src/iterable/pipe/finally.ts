import { MonoTypeOperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { FinallyIterable } from '../finally';

export function _finally<TSource>(action: () => void): MonoTypeOperatorFunction<TSource> {
  return function finallyOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FinallyIterable<TSource>(source, action);
  };
}
