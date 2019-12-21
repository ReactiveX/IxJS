import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class DefaultIfEmptyIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _defaultValue: TSource;

  constructor(source: Iterable<TSource>, defaultValue: TSource) {
    super();
    this._source = source;
    this._defaultValue = defaultValue;
  }

  *[Symbol.iterator]() {
    let state = 1;
    for (let item of this._source) {
      state = 2;
      yield item;
    }
    if (state === 1) {
      yield this._defaultValue;
    }
  }
}

export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new DefaultIfEmptyIterable<T>(source, defaultValue);
  };
}
