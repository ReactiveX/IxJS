import { IterableX } from './iterable';
import { AsyncIterableX } from './asynciterable';
import { AsyncObservableX } from './asyncobservable/asyncobservablex';

export type UnaryFunction<T, R> = (source: T) => R;

export type OperatorFunction<T, R> = UnaryFunction<Iterable<T>, IterableX<R>>;

export type OperatorAsyncFunction<T, R> = UnaryFunction<AsyncIterable<T>, AsyncIterableX<R>>;

export type OperatorAsyncObservableFunction<T, R> = UnaryFunction<
AsyncObservable<T>,
AsyncObservableX<R>
>;

export type MonoTypeOperatorFunction<T> = OperatorFunction<T, T>;

export type MonoTypeOperatorAsyncFunction<T> = OperatorAsyncFunction<T, T>;

export type MonoTypeOperatorAsyncObservableFunction<T> = OperatorAsyncObservableFunction<T, T>;

/** @ignore */
export type BufferLike = string | Buffer | Uint8Array;

export const SYMBOL_ASYNC_DISPOSABLE = Symbol.for('AsyncDisposable');

export interface AsyncSubscription {
  [SYMBOL_ASYNC_DISPOSABLE]: () => Promise<void>;
}

export interface NextAsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete?: () => Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => Promise<void>;
  error?: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}

export type PartialAsyncObserver<T> =
  | NextAsyncObserver<T>
  | ErrorAsyncObserver<T>
  | CompletionAsyncObserver<T>;

export interface AsyncObserver<T> {
  next: (value: T) => Promise<void>;
  error: (err: any) => Promise<void>;
  complete: () => Promise<void>;
}

export interface AsyncObservable<T> {
  subscribeAsync: (
    observer: PartialAsyncObserver<T>,
    signal?: AbortSignal
  ) => Promise<AsyncSubscription>;
}

export interface AsyncSubject<TInput, TOutput = TInput>
  extends AsyncObserver<TInput>,
  AsyncObservable<TOutput> {}

export interface AsyncScheduler {
  now: number;
  scheduleNowAsync(
    action: (signal: AbortSignal) => Promise<void>,
    signal?: AbortSignal
  ): Promise<AsyncSubscription>;
  scheduleFutureAsync(
    action: (signal: AbortSignal) => Promise<void>,
    dueTime: number,
    signal?: AbortSignal
  ): Promise<AsyncSubscription>;
}
