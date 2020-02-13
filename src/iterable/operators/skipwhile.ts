import { IterableX } from '../iterablex';
import { OperatorFunction } from '../../interfaces';

export class SkipWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let yielding = false;
    let i = 0;
    for (const element of this._source) {
      if (!yielding && !this._predicate(element, i++)) {
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
): OperatorFunction<T, S>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T>;
export function skipWhile<T>(
  predicate: (value: T, index: number) => boolean
): OperatorFunction<T, T> {
  return function skipWhileOperatorFunction(source: Iterable<T>): IterableX<T> {
    return new SkipWhileIterable<T>(source, predicate);
  };
}
