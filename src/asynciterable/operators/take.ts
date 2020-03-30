import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { throwIfAborted } from '../../aborterror';

export class TakeAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _count: number;

  constructor(source: AsyncIterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    throwIfAborted(signal);
    let i = this._count;
    if (i > 0) {
      for await (const item of wrapWithAbort(this._source, signal)) {
        yield item;
        if (--i === 0) {
          break;
        }
      }
    }
  }
}

export function take<TSource>(count: number): MonoTypeOperatorAsyncFunction<TSource> {
  return function takeOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new TakeAsyncIterable<TSource>(source, count);
  };
}
