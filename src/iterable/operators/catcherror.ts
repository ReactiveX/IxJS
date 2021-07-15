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
    let err: Iterable<TResult> | undefined;
    let hasError = false;
    const it = this._source[Symbol.iterator]();
    while (1) {
      let done: boolean | undefined;
      let value: TSource;

      try {
        ({ done, value } = it.next());
        if (done) {
          returnIterator(it);
          break;
        }
      } catch (e) {
        err = this._handler(e);
        hasError = true;
        returnIterator(it);
        break;
      }

      yield value;
    }

    if (hasError) {
      for (const item of err!) {
        yield item;
      }
    }
  }
}

/**
 * Continues an async-iterable sequence that is terminated by an exception with the
 * async-iterable sequence produced by the handler.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of elements from the handler function.
 * @param {(error: any) => Iterable<TResult>} handler Error handler function, producing another async-iterable sequence.
 * @returns {(OperatorFunction<TSource, TSource | TResult>)} An operator which continues an async-iterable sequence that is terminated by
 * an exception with the specified handler.
 */
export function catchError<TSource, TResult>(
  handler: (error: any) => Iterable<TResult>
): OperatorFunction<TSource, TSource | TResult> {
  return function catchWithOperatorFunction(
    source: Iterable<TSource>
  ): IterableX<TSource | TResult> {
    return new CatchWithIterable<TSource, TResult>(source, handler);
  };
}
