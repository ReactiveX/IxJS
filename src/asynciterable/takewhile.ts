import { AsyncIterableX } from '../asynciterable';

export class TakeWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _source: AsyncIterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean | Promise<boolean>;

  constructor(
    source: AsyncIterable<TSource>,
    predicate: (value: TSource, index: number) => boolean | Promise<boolean>
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async *[Symbol.asyncIterator]() {
    let i = 0;
    for await (let item of this._source) {
      if (!await this._predicate(item, i++)) {
        break;
      }
      yield item;
    }
  }
}

export function takeWhile<T, S extends T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => value is S
): AsyncIterableX<S>;
export function takeWhile<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T>;
export function takeWhile<T>(
  source: AsyncIterable<T>,
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): AsyncIterableX<T> {
  return new TakeWhileAsyncIterable<T>(source, predicate);
}
