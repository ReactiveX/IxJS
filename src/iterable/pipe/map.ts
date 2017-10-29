import { OperatorFunction } from '../../interfaces';
import { IterableX } from '../../iterable';
import { MapIterable } from '../map';
import { bindCallback } from '../../internal/bindcallback';

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => TResult,
  thisArg?: any
): OperatorFunction<TSource, TResult> {
  return function mapOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new MapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
  };
}
