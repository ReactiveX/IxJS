import { IterableX } from '../iterablex';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class ExpandIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => Iterable<TSource>;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TSource>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    const q = [this._source];
    while (q.length > 0) {
      const src = q.shift();
      for (const item of src!) {
        q.push(this._fn(item));
        yield item;
      }
    }
  }
}

/**
 * Expands (breadth first) the iterable sequence by recursively applying a selector function to generate more sequences at each recursion level.
 *
 * @template TSource Source sequence element type.
 * @param {(( value: TSource) => Iterable<TSource>)} selector Selector function to retrieve the next sequence to expand.
 * @returns {MonoTypeOperatorFunction<TSource>} An operator which returns a sequence with results
 * from the recursive expansion of the source sequence.
 */
export function expand<TSource>(
  selector: (value: TSource) => Iterable<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function expandOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new ExpandIterable<TSource>(source, selector);
  };
}
