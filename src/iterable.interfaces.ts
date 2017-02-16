'use strict';

export interface ICollectionLike {
  length: number;
}

export interface IIndexedCollectionLike extends ICollectionLike {
  [index: number]: any;
}

export interface IIteratorResult<T> {
  value: any;
  done: boolean;
}

export interface IIterator<T> {
  [Symbol.iterator]();
  next(): IIteratorResult<T>;
}

export interface IIterable<T> {
  [Symbol.iterator](): IIterator<T>;
}