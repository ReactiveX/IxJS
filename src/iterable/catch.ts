import { IterableX } from '../iterable';
import { returnIterator } from '../internal/returniterator';

class CatchIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    let error = null, hasError = false;

    for (let source of this._source) {
      const it = source[Symbol.iterator]();

      error = null;
      hasError = false;

      while (1) {
        let c = <TSource>{};

        try {
          const { done, value } = it.next();
          if (done) {
            returnIterator(it);
            break;
          }
          c = value;
        } catch (e) {
          error = e;
          hasError = true;
          returnIterator(it);
          break;
        }

        yield c;
      }

      if (!hasError) { break; }
    }

    if (hasError) { throw error; }
  }
}

/**
 * Creates a sequence by concatenating source sequences until a source sequence completes successfully.
 * @param {Iterabe<Iterable<TSource>>} source Source sequences.
 * @return {Iterable<TSource>} Sequence that continues to concatenate source sequences while errors occur.
 */
export function _catchAll<TSource>(source: Iterable<Iterable<TSource>>): IterableX<TSource> {
  return new CatchIterable<TSource>(source);
}

/**
 * Creates a sequence by concatenating source sequences until a source sequence completes successfully.
 * @param {Iterable<TSource>} source The first source.
 * @param {...Iterable<TSource>} args The rest of the sequence that continues to concatenate source sequences while errors occur.
 */
export function _catch<TSource>(source: Iterable<TSource>, ...args: Iterable<TSource>[]): IterableX<TSource> {
  return new CatchIterable<TSource>([source, ...args]);
}

/**
 * Creates a sequence by concatenating source sequences until a source sequence completes successfully.
 * @param {...Iterable<TSource>} source Sequence that continues to concatenate source sequences while errors occur.
 * @return {Iterable<TSource>} Sequence that continues to concatenate source sequences while errors occur.
 */
export function _catchStatic<TSource>(...source: Iterable<TSource>[]): IterableX<TSource> {
  return new CatchIterable<TSource>(source);
}
