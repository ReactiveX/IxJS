import { IterableX } from '../iterablex';
import { returnIterator } from '../../util/returniterator';
import { OperatorFunction } from '../../interfaces';

export class CatchWithIterable<TSource, TResult> extends IterableX<TSource | TResult> {
  private _source: Iterable<TSource>;
  private _handler: (error: any) => Iterable<TResult>;

  constructor(source: Iterable<TSource>, handler: (error: any) => Iterable<TResult>) {
    super();
    this._source = source;
    this._handler = handler;
  }

  *[Symbol.iterator]() {
    let err: Iterable<TResult> | undefined,
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

export function catchError<TSource, TResult>(
  handler: (error: any) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function catchWithOperatorFunction(source: Iterable<TSource>): IterableX<TSource | TResult> {
    return new CatchWithIterable<TSource, TResult>(source, handler);
  };
}
