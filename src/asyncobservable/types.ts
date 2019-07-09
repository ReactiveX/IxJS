export interface AsyncUnsubscribable {
  unsubscribeAsync: () => Promise<void>;
}

export interface NextAsyncObserver<T> {
  nextAsync: (value: T) => Promise<void>;
  errorAsync?: (err: any) => Promise<void>;
  completeAsync?: () => Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  nextAsync?: (value: T) => Promise<void>;
  errorAsync: (err: any) => Promise<void>;
  completeAsync?: () => Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  nextAsync?: (value: T) => Promise<void>;
  errorAsync?: (err: any) => Promise<void>;
  completeAsync: () => Promise<void>;
}

export type PartialAsyncObserver<T> =
  | NextAsyncObserver<T>
  | ErrorAsyncObserver<T>
  | CompletionAsyncObserver<T>;

export interface AsyncObserver<T> {
  nextAsync: (value: T) => Promise<void>;
  errorAsync: (err: any) => Promise<void>;
  completeAsync: () => Promise<void>;
}

export interface AsyncSubscribable<T> {
  subscribeAsync: (observer: PartialAsyncObserver<T>) => Promise<AsyncUnsubscribable>;
}

export interface AsyncSubject<T>
  extends AsyncObserver<T>,
    AsyncSubscribable<T>,
    AsyncUnsubscribable {}

export type UnaryFunction<T, R> = (source: T) => R;

export type AsyncObservableOperatorFunction<T, R> = UnaryFunction<
  AsyncSubscribable<T>,
  AsyncSubscribable<R>
>;

export type AsyncObservableMonoTypeOperatorFunction<T> = AsyncObservableOperatorFunction<T, T>;
