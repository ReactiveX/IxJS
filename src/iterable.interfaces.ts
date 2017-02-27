'use strict';

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

export type PartialObserver<T> = NextObserver<T> | ErrorObserver<T> | CompletionObserver<T>;

export interface ICollectionLike {
  length: number;
}

export interface IIndexedCollectionLike extends ICollectionLike {
  [index: number]: any;
}

export interface IIteratorResult<T> {
  value: T;
  done: boolean;
}

export interface IIterator<T> {
  [Symbol.iterator]();
  next(): IIteratorResult<T>;
}

export interface IIterable<T> {
  [Symbol.iterator](): IIterator<T>;
}