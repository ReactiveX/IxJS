import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { wrapWithAbort } from './withabort';
import { AbortError } from 'ix/util/aborterror';

export class EndWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _args: TSource[];
  private _signal?: AbortSignal;

  constructor(source: AsyncIterable<TSource>, args: TSource[], signal?: AbortSignal) {
    super();
    this._source = source;
    this._args = args;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    for await (const item of wrapWithAbort(this._source, this._signal)) {
      yield item;
    }

    if (this._signal?.aborted) {
      throw new AbortError();
    }

    for (const x of this._args) {
      if (this._signal?.aborted) {
        throw new AbortError();
      }

      yield x;
    }
  }
}

export function endWith<TSource>(...args: TSource[]): MonoTypeOperatorAsyncFunction<TSource> {
  return function endsWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new EndWithAsyncIterable<TSource>(source, args);
  };
}
