import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';

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

  async *[Symbol.asyncIterator]() {
    const map = [] as TSource[];
    for await (const lItem of this._left) {
      if ((await arrayIndexOfAsync(map, lItem, this._comparer)) === -1) {
        map.push(lItem);
        yield lItem;
      }
    }

    for await (const rItem of this._right) {
      if ((await arrayIndexOfAsync(map, rItem, this._comparer)) === -1) {
        map.push(rItem);
        yield rItem;
      }
    }
  }
}

export function union<TSource>(
  right: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function unionOperatorFunction(left: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new UnionAsyncIterable<TSource>(left, right, comparer);
  };
}
