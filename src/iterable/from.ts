import { IterableX } from './iterablex';
import { identity } from '../util/identity';
import { bindCallback } from '../util/bindcallback';
import { isIterable, isArrayLike, isIterator } from '../util/isiterable';
import { toLength } from '../util/tolength';

/** @nocollapse */
export let from: <TSource, TResult = TSource>(
  source: Iterable<TSource> | Iterator<TSource> | ArrayLike<TSource>,
  selector?: (value: TSource, index: number) => TResult,
  thisArg?: any
) => IterableX<TResult>;

/** @nocollapse */
export let FromIterable: new <TSource, TResult = TSource>(
  source: Iterable<TSource> | ArrayLike<TSource>,
  selector: (value: TSource, index: number) => TResult
) => IterableX<TResult>;

export function _initialize(Ctor: typeof IterableX) {
  /** @nocollapse */
  from = function<TSource, TResult = TSource>(
    source: Iterable<TSource> | Iterator<TSource> | ArrayLike<TSource>,
    selector: (value: TSource, index: number) => TResult = identity,
    thisArg?: any
  ): IterableX<TResult> {
    const fn = bindCallback(selector, thisArg, 2);
    if (isIterable(source)) {
      return new FromIterable<TSource, TResult>(source, fn);
    }
    if (isArrayLike(source)) {
      return new FromIterable<TSource, TResult>(source, fn);
    }
    if (isIterator(source)) {
      return new FromIterable<TSource, TResult>({ [Symbol.iterator]: () => source }, fn);
    }
    throw new TypeError('Input type not supported');
  };

  // eslint-disable-next-line no-shadow
  FromIterable = class FromIterable<TSource, TResult = TSource> extends Ctor<TResult> {
    private _source: Iterable<TSource> | ArrayLike<TSource>;
    private _fn: (value: TSource, index: number) => TResult;

    constructor(
      source: Iterable<TSource> | ArrayLike<TSource>,
      fn: (value: TSource, index: number) => TResult
    ) {
      super();
      this._source = source;
      this._fn = fn;
    }

    *[Symbol.iterator]() {
      const iterable = isIterable(this._source);
      let i = 0;
      if (iterable) {
        for (const item of <Iterable<TSource>>this._source) {
          yield this._fn(item, i++);
        }
      } else {
        const length = toLength((<ArrayLike<TSource>>this._source).length);
        while (i < length) {
          const val = (<ArrayLike<TSource>>this._source)[i];
          yield this._fn(val, i++);
        }
      }
    }
  };
}
