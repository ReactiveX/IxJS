import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { FlatMapIterable } from '../flatmap';
import { bindCallback } from '../../internal/bindcallback';

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => Iterable<TResult>,
  thisArg?: any
): OperatorFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new FlatMapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
  };
}
