import { IterableX } from '../iterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorFunction } from '../../interfaces';

export class FlatMapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource) => Iterable<TResult>;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TResult>) {
    super();
    this._source = source;
    this._fn = fn;
  }

  *[Symbol.iterator]() {
    for (const outerItem of this._source) {
      for (const innerItem of this._fn(outerItem)) {
        yield innerItem;
      }
    }
  }
}

export function flatMap<TSource, TResult>(
  selector: (value: TSource) => Iterable<TResult>,
  thisArg?: any
): OperatorFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new FlatMapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 1));
  };
}
