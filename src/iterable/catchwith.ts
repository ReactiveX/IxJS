import { IterableX } from '../iterable';
import { returnIterator } from '../internal/returniterator';

class CatchWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _handler: (error: any) => Iterable<TSource>;

  constructor(source: Iterable<TSource>, handler: (error: any) => Iterable<TSource>) {
    super();
    this._source = source;
    this._handler = handler;
  }

  *[Symbol.iterator]() {
    let err: Iterable<TSource> | undefined, hasError = false, it = this._source[Symbol.iterator]();
    while (1) {
      let c = <IteratorResult<TSource>>{};

      try {
        c = it.next();
        if (c.done) {
          returnIterator(it);
          break;
        }
      } catch (e) {
        err = this._handler(e);
        hasError = true;
        returnIterator(it);
        break;
      }

      yield c.value;
    }

    if (hasError) {
      for (let item of err!) {
        yield item;
      }
    }
  }
}

/**
 * Creates a sequence that corresponds to the source sequence, concatenating it with the sequence resulting from
 * calling an exception handler function in case of an error.
 * @param {Iterable<TSource>} source Source sequence
 * @param {function(error: any): Iterable<TSource>} handler Handler to invoke when an exception of the specified type occurs.
 * @return {Iterable<TSource>} Source sequence, concatenated with an exception handler result sequence in case of an error.
 */
export function catchWith<TSource>(
    source: Iterable<TSource>,
    handler: (error: any) => Iterable<TSource>): IterableX<TSource> {
  return new CatchWithIterable<TSource>(source, handler);
}
