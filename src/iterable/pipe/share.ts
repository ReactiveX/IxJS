import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { share as shareStatic } from '../share';

export function share<TSource>(): OperatorFunction<TSource, TSource>;
export function share<TSource, TResult>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TResult>;
export function share<TSource, TResult = TSource>(
  selector?: (value: Iterable<TSource>) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function shareOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return shareStatic<TSource, TResult>(source, selector);
  };
}
