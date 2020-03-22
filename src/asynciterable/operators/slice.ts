import { AbortSignal } from '../../abortsignal';
import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';

export class SliceAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _begin: number;
  private _end: number;

  constructor(source: AsyncIterable<TSource>, begin: number, end: number) {
    super();
    this._source = source;
    this._begin = begin;
    this._end = end;
  }

  async *[Symbol.asyncIterator](signal?: AbortSignal) {
    const source = wrapWithAbort(this._source, signal);
    const it = source[Symbol.asyncIterator]();
    let begin = this._begin;
    let next;
    while (begin > 0 && !(next = await it.next()).done) {
      begin--;
    }

    let end = this._end;
    if (end > 0) {
      while (!(next = await it.next()).done) {
        yield next.value;
        if (--end === 0) {
          break;
        }
      }
    }
  }
}

export function slice<TSource>(
  begin: number,
  end: number = Infinity
): MonoTypeOperatorAsyncFunction<TSource> {
  return function sliceOperatorFunction(source: AsyncIterable<TSource>): AsyncIterableX<TSource> {
    return new SliceAsyncIterable<TSource>(source, begin, end);
  };
}
