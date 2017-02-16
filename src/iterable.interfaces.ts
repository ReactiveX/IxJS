'use strict';

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