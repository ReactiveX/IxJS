import { IterableX } from '../iterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorFunction } from '../../interfaces';

export class FilterIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (let item of this._source) {
      if (this._predicate(item, i++)) {
        yield item;
      }
    }
  }
}

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any
): OperatorFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean,
  thisArg?: any
): OperatorFunction<T, T>;
export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean,
  thisArg?: any
): OperatorFunction<TSource, TSource> {
  return function filterOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new FilterIterable<TSource>(source, bindCallback(predicate, thisArg, 2));
  };
}
