import { AsyncIterableX } from '../asynciterablex';
import { OperatorAsyncFunction } from '../../interfaces';

export class SkipWhileAsyncIterable<TSource> extends AsyncIterableX<TSource> {
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
    let yielding = false;
    let i = 0;
    for await (const element of this._source) {
      if (!yielding && !(await this._predicate(element, i++))) {
        yielding = true;
      }
      if (yielding) {
        yield element;
      }
    }
  }
}

export function skipWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorAsyncFunction<T, S>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean | Promise<boolean>
): OperatorAsyncFunction<T, T> {
  return function skipWhileOperatorFunction(source: AsyncIterable<T>): AsyncIterableX<T> {
    return new SkipWhileAsyncIterable<T>(source, predicate);
  };
}
