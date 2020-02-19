import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../util/aborterror';
import { bindCallback } from '../../util/bindcallback';

export class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      if (await this._predicate(item, i++)) {
        throwIfAborted(this._signal);
        yield item;
      }
    }
  }
}

export function filter<T, S extends T>(
  predicate: (value: T, index: number) => value is S,
  thisArg?: any,
  signal?: AbortSignal
): OperatorAsyncFunction<T, S>;
export function filter<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): OperatorAsyncFunction<T, T>;
export function filter<TSource>(
  predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
  thisArg?: any,
  signal?: AbortSignal
): OperatorAsyncFunction<TSource, TSource> {
  return function filterOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new FilterAsyncIterable<TSource>(source, bindCallback(predicate, thisArg, 2), signal);
  };
}
