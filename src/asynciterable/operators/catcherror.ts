import { AsyncIterableX } from '../asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../../interfaces';
import { returnAsyncIterator } from '../../util/returniterator';

export class CatchWithAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _handler: (error: any) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>;

  constructor(
    source: AsyncIterable<TSource>,
    handler: (error: any) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
  ) {
    super();
    this._source = source;
    this._handler = handler;
  }

  async *[Symbol.asyncIterator]() {
    let err: AsyncIterable<TSource> | undefined,
      hasError = false,
      it = this._source[Symbol.asyncIterator]();
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
      for await (let item of err!) {
        yield item;
      }
    }
  }
}

export function catchError<TSource>(
  handler: (error: any) => AsyncIterable<TSource> | Promise<AsyncIterable<TSource>>
): MonoTypeOperatorAsyncFunction<TSource> {
  return function catchWithOperatorFunction(
    source: AsyncIterable<TSource>
  ): AsyncIterableX<TSource> {
    return new CatchWithAsyncIterable<TSource>(source, handler);
  };
}
