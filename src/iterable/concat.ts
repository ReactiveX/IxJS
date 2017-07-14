import { IterableX } from '../iterable';

class ConcatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (let outer of this._source) { yield* outer; }
  }
}

/**
 * Concatenates the input sequences.
 * @param {Iterable<Iterable<TSource>>} source Source sequences.
 * @return {Iterable<TSource>} Sequence with the elements of the source sequences concatenated.
 */
export function concatAll<TSource>(source: Iterable<Iterable<TSource>>): IterableX<TSource> {
  return new ConcatIterable<TSource>(source);
}

/**
 * Concatenates the input sequences.
 * @param {Iterable<TSource>} source The first source sequence.
 * @param {...Iterable<TSource>} args The rest of the source sequences.
 * @return {Iterable<TSource>} Sequence with the elements of the source sequences concatenated.
 */
export function concat<T>(source: Iterable<T>, ...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable([source, ...args]);
}

/**
 * Concatenates the input sequences.
 * @param {...Iterable<TSource>} args Source sequences.
 * @return {Iterable<TSource>} Sequence with the elements of the source sequences concatenated.
 */
export function concatStatic<T>(...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable(args);
}
