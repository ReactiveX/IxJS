import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

/** @ignore */
export class EndWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _args: TSource[];

  constructor(source: Iterable<TSource>, args: TSource[]) {
    super();
    this._source = source;
    this._args = args;
  }

  *[Symbol.iterator]() {
    for (const item of this._source) {
      yield item;
    }
    for (const x of this._args) {
      yield x;
    }
  }
}

/**
 * Append values to an iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @param {...TSource[]} args The values to append to the end of the iterable sequence.
 * @returns {MonoTypeOperatorFunction<TSource>} An operator which appends values to the end of the sequence.
 */
export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorFunction<TSource> {
  return function endsWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new EndWithIterable<TSource>(source, args);
  };
}
