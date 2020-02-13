import { AsyncIterableX } from '../asynciterablex';
import { isAsyncIterable } from '../../util/isiterable';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class FlattenAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _depth: number;
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, depth: number, signal?: AbortSignal) {
    super();
    this._source = source;
    this._depth = depth;
    this._signal = signal;
  }

  private async *_flatten(source: AsyncIterable<TSource>, depth: number): AsyncIterable<TSource> {
    if (depth === 0) {
      for await (const item of source) {
        yield item;
      }
      return undefined;
    }
    for await (const item of source) {
      if (isAsyncIterable(item)) {
        for await (const innerItem of this._flatten(wrapWithAbort(item, this._signal), depth - 1)) {
          yield innerItem;
        }
      } else {
        yield item;
      }
    }
    return undefined;
  }

  [Symbol.asyncIterator]() {
    return this._flatten(wrapWithAbort(this._source, this._signal), this._depth)[
      Symbol.asyncIterator
    ]();
  }
}

export function flat<T>(depth: number = Infinity): MonoTypeOperatorAsyncFunction<T> {
  return function flattenOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new FlattenAsyncIterable<T>(source, depth);
  };
}
