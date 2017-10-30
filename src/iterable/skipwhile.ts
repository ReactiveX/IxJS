import { IterableX } from './iterablex';

export class SkipWhileIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _predicate: (value: TSource, index: number) => boolean;

  constructor(source: Iterable<TSource>, predicate: (value: TSource, index: number) => boolean) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  *[Symbol.iterator]() {
    let yielding = false,
      i = 0;
    for (let element of this._source) {
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
  source: Iterable<T>,
  predicate: (value: T, index: number) => value is S
): IterableX<S>;
export function skipWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource>;
export function skipWhile<TSource>(
  source: Iterable<TSource>,
  predicate: (value: TSource, index: number) => boolean
): IterableX<TSource> {
  return new SkipWhileIterable<TSource>(source, predicate);
}
