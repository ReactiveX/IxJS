import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';
import { returnAsyncIterator } from '../../util/returniterator';

export class CatchWithAsyncIterable<TSource, TResult> extends AsyncIterableX<TSource | TResult> {
  private _source: AsyncIterable<TSource>;
  private _handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

  constructor(
    source: AsyncIterable<TSource>,
    handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
  ) {
    super();
    this._source = source;
    this._handler = handler;
  }

  async *[Symbol.asyncIterator]() {
    let err: AsyncIterable<TResult> | undefined;
    let hasError = false;
    const it = this._source[Symbol.asyncIterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        c = await it.next();
        if (c.done) {
          await returnAsyncIterator(it);
          break;
        }
      } catch (e) {
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
  handler: (error: any) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>
): OperatorAsyncFunction<TSource, TSource | TResult> {
  return function catchWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource | TResult> {
    return new CatchWithAsyncIterable<TSource, TResult>(source, handler);
  };
}
