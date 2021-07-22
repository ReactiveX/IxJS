import { IterableX } from './iterablex';

export class OnErrorResumeNextIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (const item of this._source) {
      const it = item[Symbol.iterator]();
      while (1) {
        let next;
        try {
          next = it.next();
        } catch (e) {
          break;
        }

        if (next.done) {
          break;
        }
        yield next.value;
      }
    }
  }
}

/**
 * Concatenates all of the specified iterable sequences, even if the previous iterable sequence terminated exceptionally.
 *
 * @template T The type of the elements in the source sequences.
 * @param {...Iterable<T>[]} args iterable sequences to concatenate.
 * @returns {IterableX<T>} An iterable sequence that concatenates the source sequences, even if a sequence terminates exceptionally.
 */
export function onErrorResumeNext<T>(...source: Iterable<T>[]): IterableX<T> {
  return new OnErrorResumeNextIterable<T>(source);
}
