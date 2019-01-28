import { IterableX } from './iterablex';

export class ConcatIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<Iterable<TSource>>;

  constructor(source: Iterable<Iterable<TSource>>) {
    super();
    this._source = source;
  }

  *[Symbol.iterator]() {
    for (let outer of this._source) {
      yield* outer;
    }
  }
}

/* tslint:disable:max-line-length */
export function concat<T>(v1: Iterable<T>): IterableX<T>;
export function concat<T, T2>(v1: Iterable<T>, v2: Iterable<T2>): IterableX<T | T2>;
export function concat<T, T2, T3>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>
): IterableX<T | T2 | T3>;
export function concat<T, T2, T3, T4>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>
): IterableX<T | T2 | T3 | T4>;
export function concat<T, T2, T3, T4, T5>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>
): Iterable<T | T2 | T3 | T4 | T5>;
export function concat<T, T2, T3, T4, T5, T6>(
  v1: Iterable<T>,
  v2: Iterable<T2>,
  v3: Iterable<T3>,
  v4: Iterable<T4>,
  v5: Iterable<T5>,
  v6: Iterable<T6>
): Iterable<T | T2 | T3 | T4 | T5 | T6>;
/* tslint:enable:max-line-length */

export function concat<T>(...args: Iterable<T>[]): IterableX<T> {
  return new ConcatIterable<T>(args);
}
