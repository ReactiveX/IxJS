import { AsyncIterableX } from '../asynciterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class FlatMapAsyncIterable<TSource, TResult> extends AsyncIterableX<TResult> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource) => AsyncIterable<TResult>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource) => AsyncIterable<TResult>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    for await (const outer of wrapWithAbort(this._source, this._signal)) {
      const inners = await this._selector(outer);
      for await (const inner of inners) {
        yield inner;
      }
    }
  }
}

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => AsyncIterable<TResult>,
  thisArg?: any,
  signal?: AbortSignal
): OperatorAsyncFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TResult> {
    return new FlatMapAsyncIterable<TSource, TResult>(
      source,
      bindCallback(selector, thisArg, 1),
      signal
    );
  };
}
