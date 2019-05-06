import { OperatorAsyncFunction } from '../interfaces';
import { bindCallback } from '../util/bindcallback';
import { Observable } from '../observer';

/**
 * This class serves as the base for all operations which support [Symbol.asyncIterator].
 */
export abstract class AsyncIterableX<T> implements AsyncIterable<T> {
  abstract [Symbol.asyncIterator](): AsyncIterator<T>;

  async forEach(
    projection: (value: T, index: number) => void | Promise<void>,
    thisArg?: any
  ): Promise<void> {
    const fn = bindCallback(projection, thisArg, 2);
    let i = 0;
    for await (let item of this) {
      await fn(item, i++);
    }
  }

  pipe<R>(...operations: OperatorAsyncFunction<T, R>[]): AsyncIterableX<R> {
    if (operations.length === 0) {
      return this as any;
    }

    const piped = (input: AsyncIterable<T>): AsyncIterableX<R> => {
      return operations.reduce(
        (prev: any, fn: OperatorAsyncFunction<T, R>) => fn(prev),
        input as any
      );
    };

    return piped(this);
  }
}

export type AsyncIterableInput<TSource> =
  | AsyncIterable<TSource>
  | Iterable<TSource | PromiseLike<TSource>>
  | ArrayLike<TSource>
  | PromiseLike<TSource>
  | Observable<TSource>;
