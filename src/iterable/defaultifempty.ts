import { IterableX } from '../iterable';

class DefaultIfEmptyIterable<TSource> extends IterableX<TSource> {
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

/**
 * Returns the elements of the specified sequence or the type parameter's default value in a singleton collection if the sequence is empty.
 * @param {Iterable<T>} source The sequence to return a default value for if it is empty.
 * @param {T} defaultValue The default value if the sequence is empty.
 * @return An that contains the default value if source is empty; otherwise, source.
 */
export function defaultIfEmpty<T>(source: Iterable<T>, defaultValue: T): IterableX<T> {
  return new DefaultIfEmptyIterable<T>(source, defaultValue);
}
