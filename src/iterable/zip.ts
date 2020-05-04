import { IterableX } from './iterablex';
import { returnIterator } from '../util/returniterator';

export class ZipIterable<TSource> extends IterableX<TSource[]> {
  private _sources: Iterable<TSource>[];

  constructor(sources: Iterable<TSource>[]) {
    super();
    this._sources = sources;
  }
  // eslint-disable-next-line consistent-return
  *[Symbol.iterator](): IterableIterator<TSource[]> {
    const sourcesLength = this._sources.length;
    const its = this._sources.map((x) => x[Symbol.iterator]());
    while (sourcesLength > 0) {
      const values = new Array(sourcesLength);
      for (let index = -1; ++index < sourcesLength; ) {
        const result = its[index].next();
        if (result.done) {
          its.forEach(returnIterator);
          return undefined;
        }
        values[index] = result.value;
      }
      yield values;
    }
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

export function zip<T>(...sources: Iterable<T>[]): IterableX<T[]> {
  return new ZipIterable<T>(sources);
}
