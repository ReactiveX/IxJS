import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { returnAsyncIterator } from '../../util/returniterator';
import { wrapWithAbort } from './withabort';
import { AbortError } from 'ix/util/aborterror';

export class CatchWithAsyncIterable<TSource, TResult> extends AsyncIterableX<TSource | TResult> {
  private _source: AsyncIterable<TSource>;
  private _handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
  private _signal?: AbortSignal;

  constructor(
    source: AsyncIterable<TSource>,
    handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
    signal?: AbortSignal
  ) {
    super();
    this._source = source;
    this._handler = handler;
    this._signal = signal;
  }

  async *[Symbol.asyncIterator]() {
    let err: AsyncIterable<TResult> | undefined;
    let hasError = false;
    const wrappedSource = wrapWithAbort(this._source, this._signal);
    const it = wrappedSource[Symbol.asyncIterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        c = await it.next();
        if (c.done) {
          await returnAsyncIterator(it);
          break;
        }
      } catch (e) {
        if (e instanceof AbortError) {
          throw e;
        }

        err = await this._handler(e);
        hasError = true;
        await returnAsyncIterator(it);
        break;
      }

      yield c.value;
    }

    if (hasError) {
      for await (const item of err!) {
        yield item;
      }
    }
  }
}

export function catchError<TSource, TResult>(
  handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>,
  signal?: AbortSignal
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function catchWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return new CatchWithAsyncIterable<TSource, TResult>(wrapWithAbort(source, signal), handler);
  };
}
