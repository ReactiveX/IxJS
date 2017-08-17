import { AsyncIterableX } from '../asynciterable';
import { returnAsyncIterator } from '../internal/returniterator';

class CatchAllAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: Iterable<AsyncIterable<TSource>>;

  constructor(source: Iterable<AsyncIterable<TSource>>) {
    super();
    this._source = source;
  }

  async *[Symbol.asyncIterator]() {
    let error = null, hasError = false;

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

      if (!hasError) { break; }
    }

    if (hasError) { throw error; }
  }
}

export function _catchAll<TSource>(source: Iterable<AsyncIterable<TSource>>): AsyncIterableX<TSource> {
  return new CatchAllAsyncIterable<TSource>(source);
}

export function _catch<T>(source: AsyncIterable<T>, ...args: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _catchAll<T>([source].concat(args));
}

export function _catchStatic<T>(...source: AsyncIterable<T>[]): AsyncIterableX<T> {
  return _catchAll(source);
}
