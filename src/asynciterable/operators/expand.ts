import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { AbortError } from 'ix/util/aborterror';

export class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    const q = [this._source];
    while (q.length > 0) {
      const src = q.shift();
      for await (const item of wrapWithAbort(src!, this._signal)) {
        const items = await this._selector(item);
        if (this._signal?.aborted) {
          throw new AbortError();
        }
        q.push(items);
        yield item;
      }
    }
  }
}

export function expand<TSource>(
  selector: (value: TSource) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>,
  signal?: AbortSignal
): MonoTypeOperatorAsyncFunction<TSource> {
  return function expandOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExpandAsyncIterable<TSource>(source, selector, signal);
  };
}
