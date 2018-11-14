import { AsyncIterableX } from './asynciterablex';
import { MonoTypeOperatorAsyncFunction } from '../interfaces';
import { returnAsyncIterator } from '../util/returniterator';

export class CatchAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let error = null,
      hasError = false;

    for (let source of this._source) {
      const it = source[Symbol.asyncIterator]();

      error = null;
      hasError = false;

      while (1) {
        let c = <TSource>{};

        try {
          const { done, value } = await it.next();
          if (done) {
            await returnAsyncIterator(it);
            break;
          }
          c = value;
        } catch (e) {
          error = e;
          hasError = true;
          await returnAsyncIterator(it);
          break;
        }

        yield c;
      }

      if (!hasError) {
        break;
      }
    }

    if (hasError) {
      throw error;
    }
  }
}

export function catchError<T>(...args: AsyncIterable<T>[]): MonoTypeOperatorAsyncFunction<T> {
  return function catchOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new CatchAllAsyncIterable<T>([source, ...args]);
  };
}
