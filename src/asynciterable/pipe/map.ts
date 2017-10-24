import { OperatorAsyncFunction } from '../../interfaces';
import { AsyncIterableX } from '../../asynciterable';
import { MapAsyncIterable } from '../map';
import { bindCallback } from '../../internal/bindcallback';

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => Promise<TResult> | TResult,
  thisArg?: any
): OperatorAsyncFunction<TSource, TResult> {
  return function mapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new MapAsyncIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
  };
}
