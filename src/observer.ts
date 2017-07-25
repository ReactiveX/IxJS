import { Subscription } from './subscription';

export interface NextObserver<T> {
  next: (value: T) => void;
  error?: (err: any) => void;
  complete?: () => void;
}

export interface ErrorObserver<T> {
  next?: (value: T) => void;
  error: (err: any) => void;
  complete?: () => void;
}

export interface CompletionObserver<T> {
  next?: (value: T) => void;
  error?: (err: any) => void;
  complete: () => void;
}

export type PartialObserver<T> =
  NextObserver<T> |
  ErrorObserver<T> |
  CompletionObserver<T>;

export interface NextAsyncObserver<T> {
  next: (value: T) => void | Promise<void>;
  error?: (err: any) => void | Promise<void>;
  complete?: () => void | Promise<void>;
}

export interface ErrorAsyncObserver<T> {
  next?: (value: T) => void | Promise<void>;
  error: (err: any) => void | Promise<void>;
  complete?: () => void | Promise<void>;
}

export interface CompletionAsyncObserver<T> {
  next?: (value: T) => void | Promise<void>;
  error?: (err: any) => void | Promise<void>;
  complete: () => void | Promise<void>;
}

export type PartialAsyncObserver<T> =
  NextAsyncObserver<T> |
  ErrorAsyncObserver<T> |
  CompletionAsyncObserver<T>;

export interface Observer<T> {
  closed?: boolean;
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

export interface Observable<T> {
  subscribe: (observer: Observer<T>) => Subscription;
}