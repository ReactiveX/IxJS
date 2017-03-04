'use strict';

import { IIteratorResult } from './iterable.interfaces';

export interface IAsyncIterator<T> {
  [Symbol.asyncIterator]();
  next(value?: T): Promise<IIteratorResult<T>>;
  throw(value?: any): Promise<IIteratorResult<T>>;
  return(value?: T): Promise<IIteratorResult<T>>;
}

export interface IAsyncIterable<T> {
  [Symbol.asyncIterator](): IAsyncIterator<T>;
}