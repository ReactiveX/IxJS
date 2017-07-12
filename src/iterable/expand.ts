import { IterableX } from '../iterable';

class ExpandIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => Iterable<TSource>;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TSource>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    let q = [this._source];
    while (q.length > 0) {
      let src = q.shift();
      for (let item of src!) {
        q.push(this._fn(item));
        yield item;
      }
    }
  }
}

/**
 * Expands the sequence by recursively applying a selector function.
 * @param {Iterable<T>} source Source sequence.
 * @param {function(value: T): Iterable<T>} selector Selector function to retrieve the next sequence to expand
 * @return {Iterable<T>} Sequence with results from the recursive expansion of the source sequence.
 */
export function expand<TSource>(
    source: Iterable<TSource>,
    selector: (value: TSource) => Iterable<TSource>): IterableX<TSource> {
  return new ExpandIterable<TSource>(source,selector);
}
