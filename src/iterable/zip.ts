import { IterableX } from '../iterable';
import { identity } from '../internal/identity';
import { returnIterator } from '../internal/returniterator';

class ZipIterable<TSource, TResult> extends IterableX<TResult> {
  private _sources: Iterable<TSource>[];
  private _fn: (values: any[]) => TResult;

  constructor(sources: Iterable<TSource>[], fn: (values: any[]) => TResult) {
    super();
    this._sources = sources;
    this._fn = fn;
  }
  *[Symbol.iterator]() {
    const fn = this._fn;
    const sourcesLength = this._sources.length;
    const its = this._sources.map(x => x[Symbol.iterator]());
    do {
      const values = new Array(sourcesLength);
      for (let index = -1; ++index < sourcesLength; ) {
        const result = its[index].next();
        if (result.done) {
          its.forEach(returnIterator);
          return;
        }
        values[index] = result.value;
      }
      yield fn(values);
    } while (1);
  }
}

export function zip<T, T2>(source: Iterable<T>, source2: Iterable<T2>): IterableX<[T, T2]>;
export function zip<T, T2, T3>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>
): IterableX<[T, T2, T3]>;
export function zip<T, T2, T3, T4>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): IterableX<[T, T2, T3, T4]>;
export function zip<T, T2, T3, T4, T5>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): IterableX<[T, T2, T3, T4, T5]>;
export function zip<T, T2, T3, T4, T5, T6>(
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>,
  source6: Iterable<T6>
): IterableX<[T, T2, T3, T4, T5, T6]>;

export function zip<T, R>(project: (values: [T]) => R, source: Iterable<T>): IterableX<R>;
export function zip<T, T2, R>(
  project: (values: [T, T2]) => R,
  source: Iterable<T>,
  source2: Iterable<T2>
): IterableX<R>;
export function zip<T, T2, T3, R>(
  project: (values: [T, T2, T3]) => R,
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>
): IterableX<R>;
export function zip<T, T2, T3, T4, R>(
  project: (values: [T, T2, T3, T4]) => R,
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>
): IterableX<R>;
export function zip<T, T2, T3, T4, T5, R>(
  project: (values: [T, T2, T3, T4, T5]) => R,
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>
): IterableX<R>;
export function zip<T, T2, T3, T4, T5, T6, R>(
  project: (values: [T, T2, T3, T4, T5, T6]) => R,
  source: Iterable<T>,
  source2: Iterable<T2>,
  source3: Iterable<T3>,
  source4: Iterable<T4>,
  source5: Iterable<T5>,
  source6: Iterable<T6>
): IterableX<R>;

export function zip<T>(...sources: Iterable<T>[]): IterableX<T[]>;
export function zip<T, R>(project: (values: T[]) => R, ...sources: Iterable<T>[]): IterableX<R>;
/* tslint:enable:max-line-length */
export function zip<T, R>(...sources: any[]): IterableX<R> {
  let fn = sources.shift() as (values: any[]) => R;
  if (typeof fn !== 'function') {
    sources.unshift(fn);
    fn = identity;
  }
  return new ZipIterable<T, R>(sources as Iterable<T>[], fn);
}
