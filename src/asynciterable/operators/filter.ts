import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { AbortError } from 'ix/util/aborterror';

export class FilterAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;
  private _thisArg: any;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>,
    thisArg?: any,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
    this._thisArg = thisArg;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      if (await this._predicate.call(this._thisArg, item, i++)) {
        if (this._signal?.aborted) {
          throw new AbortError();
        }

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
    return new FilterAsyncIterable<TSource>(source, predicate, thisArg, signal);
  };
}
