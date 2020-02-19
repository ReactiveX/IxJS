import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { bindCallback } from 'ix/util/bindcallback';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../util/aborterror';

export class MapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource, index: number) => Promise<TResult> | TResult;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, index: number) => Promise<TResult> | TResult,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      const result = await this._selector(item, i++);
      throwIfAborted(this._signal);
      yield result;
    }
  }
}

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => Promise<TResult> | TResult,
  thisArg?: any,
  signal?: AbortSignal
): OperatorAsyncFunction<TSource, TResult> {
  return function mapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new MapAsyncIterable<TSource, TResult>(
      source,
      bindCallback(selector, thisArg, 2),
      signal
    );
  };
}
