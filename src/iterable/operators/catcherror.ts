import { IterableX } from '../iterablex';
import { returnIterator } from '../../util/returniterator';
import { MonoTypeOperatorFunction } from '../../interfaces';

export class CatchWithIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _handler: (error: any) => Iterable<TSource>;

  constructor(source: Iterable<TSource>, handler: (error: any) => Iterable<TSource>) {
    super();
    this._source = source;
    this._handler = handler;
  }

  *[Symbol.iterator]() {
    let err: Iterable<TSource> | undefined,
      hasError = false,
      it = this._source[Symbol.iterator]();
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

export function catchError<TSource>(
  handler: (error: any) => Iterable<TSource>
): MonoTypeOperatorFunction<TSource> {
  return function catchWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource> {
    return new CatchWithIterable<TSource>(source, handler);
  };
}
