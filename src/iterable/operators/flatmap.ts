import { IterableX } from '../iterablex.js';
import { OperatorFunction } from '../../interfaces.js';

/** @ignore */
export class FlatMapIterable<TSource, TResult> extends IterableX<TResult> {
  private _source: Iterable<TSource>;
  private _fn: (value: TSource, index: number) => Iterable<TResult>;
  private _thisArg?: any;

  constructor(source: Iterable<TSource>, fn: (value: TSource) => Iterable<TResult>, thisArg?: any) {
    super();
    this._source = source;
    this._fn = fn;
    this._thisArg = thisArg;
  }

  *[Symbol.iterator]() {
    let index = 0;
    for (const outerItem of this._source) {
      for (const innerItem of this._fn.call(this._thisArg, outerItem, index++)) {
        yield innerItem;
      }
    }
  }
}

/**
 * Projects each element of an iterable sequence to an iterable sequence and merges
 * the resulting iterable sequences into one iterable sequence.
 *
 * @template TSource The type of the elements in the source sequence.
 * @template TResult The type of the elements in the projected inner sequences and the elements in the merged result sequence.
 * @param {((value: TSource, index: number) => Iterable<TResult>)} selector A transform function to apply to each element.
 * @param {*} [thisArg] Option this for binding to the selector.
 * @returns {OperatorFunction<TSource, TResult>} An operator that creates an iterable sequence whose
 * elements are the result of invoking the one-to-many transform function on each element of the input sequence.
 */
export function flatMap<TSource, TResult>(
  selector: (value: TSource) => Iterable<TResult>,
  thisArg?: any
): OperatorFunction<TSource, TResult> {
  return function flatMapOperatorFunction(source: Iterable<TSource>): IterableX<TResult> {
    return new FlatMapIterable<TSource, TResult>(source, selector, thisArg);
  };
}
