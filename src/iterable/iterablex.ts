import { OperatorFunction } from '../interfaces';
import { bindCallback } from '../internal/bindcallback';
import { identity } from '../internal/identity';
import { toLength } from '../internal/tolength';
import {
  isArrayLike,
  isIterable,
  isReadableNodeStream,
  isWritableNodeStream
} from '../internal/isiterable';

/**
 * This clas serves as the base for all operations which support [Symbol.iterator].
 */
export abstract class IterableX<T> implements Iterable<T> {
  abstract [Symbol.iterator](): Iterator<T>;

  forEach(projection: (value: T, index: number) => void, thisArg?: any): void {
    const fn = bindCallback(projection, thisArg, 2);
    let i = 0;
    for (let item of this) {
      fn(item, i++);
    }
  }

  pipe<R>(...operations: OperatorFunction<T, R>[]): IterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  pipe<R>(...args: any[]) {
    let i = -1;
    let n = args.length;
    let acc: any = this;
    let as = IterableX.as;
    while (++i < n) {
      acc = as(args[i](acc));
    }
    return acc;
  }

  tee(): [ReadableStream<T>, ReadableStream<T>] {
    return this._getDOMStream().tee();
  }

  pipeTo(writable: WritableStream<T>, options?: PipeOptions) {
    return this._getDOMStream().pipeTo(writable, options);
  }

  pipeThrough<R extends ReadableStream<any>>(
    duplex: { writable: WritableStream<T>; readable: R },
    options?: PipeOptions
  ) {
    return this._getDOMStream().pipeThrough(duplex, options);
  }

  private _DOMStream?: ReadableStream<T>;
  private _getDOMStream(): ReadableStream<T> {
    return this._DOMStream || (this._DOMStream = this.publish().toDOMStream());
  }

  static as(source: string): IterableX<string>;
  static as<T extends IterableX<any>>(source: T): T;
  static as<T>(source: Iterable<T>): IterableX<T>;
  static as<T>(source: ArrayLike<T>): IterableX<T>;
  static as<T>(source: T): IterableX<T>;
  /** @nocollapse */
  static as(source: any) {
    /* tslint:disable */
    if (source instanceof IterableX) {
      return source;
    }
    if (typeof source === 'string') {
      return new OfIterable([source]);
    }
    if (isIterable(source)) {
      return new FromIterable(source, identity);
    }
    if (isArrayLike(source)) {
      return new FromIterable(source, identity);
    }
    return new OfIterable([source]);
    /* tslint:enable */
  }

  /** @nocollapse */
  static from<TSource, TResult = TSource>(
    source: Iterable<TSource> | ArrayLike<TSource>,
    selector: (value: TSource, index: number) => TResult = identity,
    thisArg?: any
  ): IterableX<TResult> {
    const fn = bindCallback(selector, thisArg, 2);
    /* tslint:disable */
    if (isIterable(source)) {
      return new FromIterable<TSource, TResult>(source, fn);
    }
    if (isArrayLike(source)) {
      return new FromIterable<TSource, TResult>(source, fn);
    }
    throw new TypeError('Input type not supported');
    /* tslint:enable */
  }

  /** @nocollapse */
  static of<TSource>(...args: TSource[]): IterableX<TSource> {
    //tslint:disable-next-line
    return new OfIterable<TSource>(args);
  }
}

class FromIterable<TSource, TResult = TSource> extends IterableX<TResult> {
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
      for (let item of <Iterable<TSource>>this._source) {
        yield this._fn(item, i++);
      }
    } else {
      let length = toLength((<ArrayLike<TSource>>this._source).length);
      while (i < length) {
        let val = (<ArrayLike<TSource>>this._source)[i];
        yield this._fn(val, i++);
      }
    }
  }
}

class OfIterable<TSource> extends IterableX<TSource> {
  private _args: TSource[];

  constructor(args: TSource[]) {
    super();
    this._args = args;
  }

  *[Symbol.iterator]() {
    yield* this._args;
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
  (isBrowser => {
    if (isBrowser) {
      return;
    }

    const as = IterableX.as;
    IterableX.prototype.pipe = nodePipe;
    const readableOpts = (x: any, opts = x._writableState || { objectMode: true }) => opts;

    function nodePipe<T>(this: IterableX<T>, ...args: any[]) {
      let i = -1;
      let end: boolean;
      let n = args.length;
      let prev: any = this;
      let next: WritableOrOperatorFunction<T, any>;
      while (++i < n) {
        next = args[i];
        if (typeof next === 'function') {
          prev = as(next(prev));
        } else if (isWritableNodeStream(next)) {
          ({ end = true } = args[i + 1] || {});
          // prettier-ignore
          return isReadableNodeStream(prev) ? prev.pipe(next, {end}) :
             prev.toNodeStream(readableOpts(next)).pipe(next, {end});
        }
      }
      return prev;
    }
  })(typeof window === 'object' && typeof document === 'object' && document.nodeType === 9);
} catch (e) {
  /* */
}
