import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

export class TakeWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._source) {
      if (!this._predicate(item, i++)) {
        break;
      }
      yield item;
    }
  }
}

export function takeWhile<T, S extends T>(
  predicate: (value: T, index: number) => value is S
): OperatorFunction<T, S>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
export function takeWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function takeWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new TakeWhileIterable<T>(source, predicate);
  };
}
