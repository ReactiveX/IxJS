import { IterableX } from '../iterablex';
import { bindCallback } from '../../util/bindcallback';
import { OperatorFunction } from '../../interfaces';

export class MapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _selector: (value: TSource, index: number) => TResult;

  constructor(source: Iterable<TSource>, selector: (value: TSource, index: number) => TResult) {
    super();
    this._source = source;
    this._selector = selector;
  }

  *[Symbol.iterator]() {
    let i = 0;
    for (const item of this._source) {
      yield this._selector(item, i++);
    }
  }
}

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => TResult,
  thisArg?: any
): OperatorFunction<TSource, TResult> {
  return function mapOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new MapIterable<TSource, TResult>(source, bindCallback(selector, thisArg, 2));
  };
}
