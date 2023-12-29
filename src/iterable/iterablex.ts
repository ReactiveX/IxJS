import { identity } from '../util/identity';
import { UnaryFunction, OperatorFunction } from '../interfaces';
import { bindCallback } from '../util/bindcallback';
import {
  isArrayLike,
  isIterable,
  isIterator,
  isReadableNodeStream,
  isWritableNodeStream,
} from '../util/isiterable';
import { toLength } from '../util/tolength';

/**
 * This class serves as the base for all operations which support [Symbol.iterator].
 */
export abstract class IterableX<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;

  /** @nocollapse */
  forEach(projection: (value: T, index: number) => void, thisArg?: any): void {
    const fn = bindCallback(projection, thisArg, 2);
    let i = 0;
    for (const item of this) {
      fn(item, i++);
    }
  }

  /** @nocollapse */
  pipe<R>(...operations: UnaryFunction<Iterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorFunction<T, R>[]): IterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  pipe<R>(...args: any[]) {
    let i = -1;
    const n = args.length;
    let acc: any = this;
    while (++i < n) {
      acc = args[i](IterableX.as(acc));
    }
    return acc;
  }

  /**
   * Converts an existing string into an iterable of characters.
   *
   * @param {string} source The string to convert to an iterable.
   * @returns {IterableX<string>} An terable stream of characters from the source.
   */
  static as(source: string): IterableX<string>;
  /**
   * Converts the iterable like input into an iterable.
   *
   * @template T The tyep of elements in the source iterable.
   * @param {Iterable<T>} source The iterable to convert to an iterable.
   * @returns {IterableX<T>} An iterable stream of the source sequence.
   */
  static as<T>(source: Iterable<T>): IterableX<T>;
  /**
   * Converts an array-like object to an iterable.
   *
   * @template T The type of elements in the source array-like sequence.
   * @param {ArrayLike<T>} source The array-like sequence to convert to an iterable.
   * @returns {IterableX<T>} The iterable containing the elements from the array-like sequence.
   */
  static as<T>(source: ArrayLike<T>): IterableX<T>;
  /**
   * Converts the object into a singleton in an iterable sequence.
   *
   * @template T The type of element to turn into an iterable sequence.
   * @param {T} source The item to turn into an iterable sequence.
   * @returns {IterableX<T>} An iterable sequence from the source object.
   */
  static as<T>(source: T): IterableX<T>;
  /** @nocollapse */
  static as(source: any) {
    if (source instanceof IterableX) {
      return source;
    }
    if (typeof source === 'string') {
      return new FromIterable([source], identity);
    }
    if (isIterable(source) || isArrayLike(source)) {
      return new FromIterable(source, identity);
    }

    return new FromIterable([source], identity);
  }

  /** @nocollapse */
  static from<TSource, TResult = TSource>(
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
  }
}

(<any>IterableX.prototype)[Symbol.toStringTag] = 'IterableX';

Object.defineProperty(IterableX, Symbol.hasInstance, {
  writable: true,
  configurable: true,
  value(inst: any) {
    return !!(inst && inst[Symbol.toStringTag] === 'IterableX');
  },
});

/** @ignore */
export class FromIterable<TSource, TResult = TSource> extends IterableX<TResult> {
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
}

type WritableOrOperatorFunction<T, R> =
  | NodeJS.WritableStream
  | NodeJS.ReadWriteStream
  | OperatorFunction<T, R>;

declare module '../iterable/iterablex' {
  interface IterableX<T> extends Iterable<T> {
    pipe(): IterableX<T>;
    pipe<A>(op1: OperatorFunction<T, A>): IterableX<A>;
    pipe<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): IterableX<B>;
    pipe<A, B, C>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>
    ): IterableX<C>;
    pipe<A, B, C, D>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>
    ): IterableX<D>;
    pipe<A, B, C, D, E>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>
    ): IterableX<E>;
    pipe<A, B, C, D, E, F>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>
    ): IterableX<F>;
    pipe<A, B, C, D, E, F, G>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>
    ): IterableX<G>;
    pipe<A, B, C, D, E, F, G, H>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>,
      op8: OperatorFunction<G, H>
    ): IterableX<H>;
    pipe<A, B, C, D, E, F, G, H, I>(
      op1: OperatorFunction<T, A>,
      op2: OperatorFunction<A, B>,
      op3: OperatorFunction<B, C>,
      op4: OperatorFunction<C, D>,
      op5: OperatorFunction<D, E>,
      op6: OperatorFunction<E, F>,
      op7: OperatorFunction<F, G>,
      op8: OperatorFunction<G, H>,
      op9: OperatorFunction<H, I>
    ): IterableX<I>;
    pipe<R>(...operations: OperatorFunction<T, R>[]): IterableX<R>;
    pipe<A extends NodeJS.WritableStream>(op1: A, options?: { end?: boolean }): A;
  }
}

try {
  ((isBrowser) => {
    if (isBrowser) {
      return;
    }

    IterableX.prototype['pipe'] = nodePipe;
    const readableOpts = (x: any, opts = x._writableState || { objectMode: true }) => opts;

    function nodePipe<T>(this: IterableX<T>, ...args: any[]) {
      let i = -1;
      let end: boolean;
      const n = args.length;
      let prev: any = this;
      let next: WritableOrOperatorFunction<T, any>;
      while (++i < n) {
        next = args[i];
        if (typeof next === 'function') {
          prev = next(IterableX.as(prev));
        } else if (isWritableNodeStream(next)) {
          ({ end = true } = args[i + 1] || {});
          // prettier-ignore
          return isReadableNodeStream(prev) ? prev.pipe(next, { end }) :
            IterableX.as(prev).toNodeStream(readableOpts(next)).pipe(next, { end });
        }
      }
      return prev;
    }
  })(typeof window === 'object' && typeof document === 'object' && document.nodeType === 9);
} catch (e) {
  /* */
}
