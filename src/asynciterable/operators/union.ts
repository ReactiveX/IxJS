import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class UnionAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _left: AsyncIterable<TSource>;
  private _right: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>;

  constructor(
    left: AsyncIterable<TSource>,
    right: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>
  ) {
    super();
    this._left = left;
    this._right = right;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const map = [] as TSource[];
    for await (const lItem of wrapWithAbort(this._left, signal)) {
      if ((await arrayIndexOfAsync(map, lItem, this._comparer)) === -1) {
        map.push(lItem);
        yield lItem;
      }
    }

    for await (const rItem of wrapWithAbort(this._right, signal)) {
      if ((await arrayIndexOfAsync(map, rItem, this._comparer)) === -1) {
        map.push(rItem);
        yield rItem;
      }
    }
  }
}

/**
 * Produces the set union of two sequences by using the given equality comparer.
 *
 * @export
 * @template TSource The type of the elements of the input sequences.
 * @param {AsyncIterable<TSource>} right An async-iterable sequence whose distinct elements form the second set for the union.
 * @param {((x: TSource, y: TSource) => boolean | Promise<boolean>)} [comparer=comparerAsync] The equality comparer to compare values.
 * @returns {MonoTypeOperatorAsyncFunction<TSource>} An async-iterable sequence that contains the elements from both input sequences,
 * excluding duplicates.
 */
export function union<TSource>(
  right: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function unionOperatorFunction(left: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new UnionAsyncIterable<TSource>(left, right, comparer);
  };
}
