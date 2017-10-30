import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable/iterablex';
import { publish as publishStatic } from '../publish';

export function publish<TSource>(): OperatorFunction<TSource, TSource>;
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function publish<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function publishOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return publishStatic(source, selector);
  };
}
