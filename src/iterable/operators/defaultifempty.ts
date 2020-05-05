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
    for (const item of this._source) {
      state = 2;
      yield item;
    }
    if (state === 1) {
      yield this._defaultValue;
    }
  }
}

/**
 * Returns the elements of the specified sequence or the default value in a singleton sequence
 * if the sequence is empty.
 *
 * @export
 * @template T The type of elements in the source sequence.
 * @param {T} defaultValue The value to return if the sequence is empty.
 * @returns {MonoTypeOperatorFunction<T>} An operator which returns the elements of the source sequence or the default value as a singleton.
 */
export function defaultIfEmpty<T>(defaultValue: T): MonoTypeOperatorFunction<T> {
  return function defaultIfEmptyOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new DefaultIfEmptyIterable<T>(source, defaultValue);
  };
}
