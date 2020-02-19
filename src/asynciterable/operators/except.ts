import { AsyncIterableX } from '../asynciterablex';
import { arrayIndexOfAsync } from '../../util/arrayindexofasync';
import { comparerAsync } from '../../util/comparer';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../util/aborterror';

export class ExceptAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _first: AsyncIterable<TSource>;
  private _second: AsyncIterable<TSource>;
  private _comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>;
  private _signal?: AbortSignal;

  constructor(
    first: AsyncIterable<TSource>,
    second: AsyncIterable<TSource>,
    comparer: (x: TSource, y: TSource) => boolean | Promise<boolean>,
    signal?: AbortSignal
  ) {
    super();
    this._first = first;
    this._second = second;
    this._comparer = comparer;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const map = [] as TSource[];
    for await (const secondItem of wrapWithAbort(this._second, this._signal)) {
      map.push(secondItem);
    }

    for await (const firstItem of wrapWithAbort(this._first, this._signal)) {
      if ((await arrayIndexOfAsync(map, firstItem, this._comparer)) === -1) {
        throwIfAborted(this._signal);
        map.push(firstItem);
        yield firstItem;
      }
    }
  }
}

export function except<TSource>(
  second: AsyncIterable<TSource>,
  comparer: (x: TSource, y: TSource) => boolean | Promise<boolean> = comparerAsync,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function exceptOperatorFunction(first: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExceptAsyncIterable<TSource>(first, second, comparer, signal);
  };
}
