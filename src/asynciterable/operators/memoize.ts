import { AsyncIterableX } from '../asynciterablex';
import {
  IRefCountList,
  MaxRefCountList,
  RefCountList
} from '../../iterable/operators/_refcountlist';
import { create } from '../create';
import { OperatorAsyncFunction } from '../../interfaces';

export class MemoizeAsyncBuffer<T> extends AsyncIterableX<T> {
  protected _source: AsyncIterator<T>;
  protected _buffer: IRefCountList<T>;
  protected _shared: Promise<IteratorResult<T>> | null;
  protected _error: any;
  protected _stopped: boolean;

  constructor(source: AsyncIterator<T>, buffer: IRefCountList<T>) {
    super();
    this._error = null;
    this._shared = null;
    this._stopped = false;
    this._source = source;
    this._buffer = buffer;
  }

  [Symbol.asyncIterator]() {
    return this._getIterable(0);
  }

  protected async *_getIterable(offset = 0) {
    let i = offset - 1;
    let done: boolean | undefined = false;
    const buffer = this._buffer;

    try {
      do {
        if (++i < buffer.count) {
          yield buffer.get(i);
          continue;
        }

        if (this._stopped) {
          throw this._error;
        }

        if (this._shared === null) {
          this._shared = this._source.next().then(r => {
            this._shared = null;
            if (!r.done) {
              buffer.push(r.value);
            }
            return r;
          });
        }

        ({ done } = await this._shared.catch(e => {
          this._error = e;
          this._stopped = true;
          throw e;
        }));

        if (!done) {
          yield buffer.get(i);
        }
      } while (!done);
    } finally {
      buffer.done();
    }
  }
}

export function memoize<TSource>(readerCount?: number): OperatorAsyncFunction<TSource, TSource>;
export function memoize<TSource, TResult>(
  readerCount?: number,
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TResult>;
export function memoize<TSource, TResult = TSource>(
  readerCount: number = -1,
  selector?: (value: AsyncIterableX<TSource>) => AsyncIterable<TResult>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function memoizeOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    if (!selector) {
      return readerCount === -1
        ? new MemoizeAsyncBuffer<TSource>(
            source[Symbol.asyncIterator](),
            new MaxRefCountList<TSource>()
          )
        : new MemoizeAsyncBuffer<TSource>(
            source[Symbol.asyncIterator](),
            new RefCountList<TSource>(readerCount)
          );
    }
    return create<TSource | TResult>(() =>
      selector!(memoize<TSource>(readerCount)(source))[Symbol.asyncIterator]()
    );
  };
}
