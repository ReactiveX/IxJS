'use strict';

import { $asyncIterator$ } from './symbol';

export abstract class AsyncIterator<T> {
  private _queue : Array<any>;
  private _current: any;

  constructor() {
    this._queue = [];
    this._current = null;
  }

  [$asyncIterator$]() {
    return this;
  }

  next(value: T) {
    return this._enqueue('next', value);
  }

  protected _enqueue(type: string, value: T) {
    var self = this;
    return new Promise(function (resolve, reject) {
      self._queue.push({
        type: type,
        value: value,
        resolve: resolve,
        reject: reject
      });
      self._resume();
    });
  }

  protected abstract _next(): void;

  protected _resume() {
    if (this._current || this._queue.length === 0) {
      return;
    }
    this._current = this._queue.shift();
    try {
      switch (this._current.type) {
        case 'throw':
          this._throw(this._current.value);
          break;
        case 'return':
          this._return(this._current.value);
          break;
        default:
          this._next(this._current.value);
          break;
      }
    } catch (error) {
      this._settle('throw', error);
    }    
  }

  protected _return(value: T) {
    this._settle('return', value);
  }

  protected _settle(type: string, value: any) {
    Promise.resolve(value).then(value => {
      const capability = this._current;
      this._current = null;
      switch (type) {
        case 'throw':
          capability.reject(value);
          break;
        case 'return':
          capability.resolve({ done: true, value: value });
          break;
        default:
          capability.resolve({ done: false, value: value });
          break;
      }
      this._resume();
    }, error => {
      this._current.reject(error);
      this._current = null;
      this._resume();
    });    
  }

  protected _throw(error) {
    this._settle('throw', error);
  }
}
