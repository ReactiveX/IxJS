import { as as asIterable } from './as';
import { _initialize as _initializeFrom } from './from';
import { UnaryFunction, OperatorFunction } from '../interfaces';
import { bindCallback } from '../util/bindcallback';
import { isReadableNodeStream, isWritableNodeStream } from '../util/isiterable';

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

  /** @nocollapse */
  pipe<R>(...operations: UnaryFunction<Iterable<T>, R>[]): R;
  pipe<R>(...operations: OperatorFunction<T, R>[]): IterableX<R>;
  pipe<R extends NodeJS.WritableStream>(writable: R, options?: { end?: boolean }): R;
  pipe<R>(...args: any[]) {
    let i = -1;
    let n = args.length;
    let acc: any = this;
    while (++i < n) {
      acc = args[i](asIterable(acc));
    }
    return acc;
  }
}

_initializeFrom(IterableX);

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

    IterableX.prototype['pipe'] = nodePipe;
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
          prev = next(asIterable(prev));
        } else if (isWritableNodeStream(next)) {
          ({ end = true } = args[i + 1] || {});
          // prettier-ignore
          return isReadableNodeStream(prev) ? prev.pipe(next, {end}) :
             asIterable(prev).toNodeStream(readableOpts(next)).pipe(next, {end});
        }
      }
      return prev;
    }
  })(typeof window === 'object' && typeof document === 'object' && document.nodeType === 9);
} catch (e) {
  /* */
}
