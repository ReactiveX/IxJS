import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';

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
  predicate: (value: T, index: number) => value is S
): OperatorAsyncFunction<T, S>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function takeWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new TakeWhileAsyncIterable<T>(source, predicate);
  };
}
