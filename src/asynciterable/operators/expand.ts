import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class ExpandAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _selector: (value: TSource, signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
    source: AsyncIterable<TSource>,
    selector: (value: TSource, signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
  ) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const q = [this._source];
    while (q.length > 0) {
      const src = q.shift();
      for await (const item of wrapWithAbort(src!, signal)) {
        const items = await this._selector(item, signal);
        q.push(items);
        yield item;
      }
    }
  }
}

export function expand<TSource>(
  selector: (value: TSource, signal?: AbortSignal) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function expandOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new ExpandAsyncIterable<TSource>(source, selector);
  };
}
