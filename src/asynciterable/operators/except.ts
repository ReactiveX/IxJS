import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexof';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class ExceptAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _first: AsyncIterable<TSource>;
  private _second: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>;

  constructor(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>
  ) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    const map = [] as TSource[];
    for await (const secondItem of wrapWithAbort(this._second, signal)) {
      map.push(secondItem);
    }

    for await (const firstItem of wrapWithAbort(this._first, signal)) {
      if ((await arrayIndexOfAsync(map, firstItem, this._comparer)) === -1) {
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

export function except<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync
): MonoTypeOperatorAsyncFunction<TSource> {
  return function exceptOperatorFunction(first: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExceptAsyncIterable<TSource>(first, second, comparer);
  };
}
