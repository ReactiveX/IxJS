import { IterableX } from './iterable';
import { AsyncIterableX } from './asynciterable';

export type UnaryFunction<T, R> = (source: T) => R;

export type OperatorFunction<T, R> = UnaryFunction<Iterable<T>, IterableX<R>>;

export type OperatorAsyncFunction<T, R> = UnaryFunction<AsyncIterable<T>, AsyncIterableX<R>>;

export type MonoTypeOperatorFunction<T> = OperatorFunction<T, T>;

export type MonoTypeOperatorAsyncFunction<T> = OperatorAsyncFunction<T, T>;

/** @ignore */
export type BufferLike = string | Buffer | Uint8Array;

export const SYMBOL_ASYNC_DISPOSABLE = Symbol.for('AsyncDisposable');

export interface AsyncSubscription {
  [SYMBOL_ASYNC_DISPOSABLE]: () => Promise<void>;
}

export interface AsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error: (error: any) => Promise<void>;
  complete: () => Promise<void>;
}

export interface AsyncObservable<T> {
  subscribeAsync: (observer: AsyncObserver<T>) => Promise<AsyncSubscription>;
}

export interface AsyncSubject<TInput, TOutput = TInput>
  extends AsyncObserver<TInput>,
  AsyncObservable<TOutput> {}

export interface AsyncScheduler {
  now: () => Date;
  scheduleAsync: (
    action: (signal: AbortSignal) => Promise<void>,
    dueTime: number
  ) => Promise<AsyncSubscription>;
}
