'use strict';

interface AsyncIteratorQueueItem {
  type: string;
  value: any;
  resolve: (value: {} | PromiseLike<{}>) => void;
  reject:  (reason: any) => void;
}

export abstract class AsyncIteratorX<T> implements AsyncIterator<T> {
  private _queue : Array<AsyncIteratorQueueItem>;
  private _current: AsyncIteratorQueueItem | undefined;

  constructor() {
    this._queue = [];
    this._current = undefined;
  }

  [Symbol.asyncIterator]() {
    return this;
  }

  next(value?: T) {
    return this._enqueue('next', value);
  }

  return(value?: T) {
    return this._enqueue('return', value);
  }

  throw(value?: any) {
    return this._enqueue('throw', value);
  }

  protected _enqueue(type: string, value: any) {
    return new Promise((resolve, reject) => {
      this._queue.push({ type, value, resolve, reject });
      this._resume();
    });
  }

  protected abstract _next(value?: T): void;

  protected _resume() {
    if (this._current || this._queue.length === 0) {
      return;
    }
    this._current = this._queue.shift();
    try {
      switch (this._current!.type) {
        case 'throw':
          this._throw(this._current!.value);
          break;
        case 'return':
          this._return(this._current!.value);
          break;
        default:
          this._next(this._current!.value);
          break;
      }
    } catch (error) {
      this._settle('throw', error);
    }
  }

  protected _settle(type: string, value: T | undefined) {
    Promise.resolve(value).then(value => {
      const capability = this._current;
      this._current = undefined;
      switch (type) {
        case 'throw':
          capability!.reject(value);
          break;
        case 'return':
          capability!.resolve({ done: true, value: value });
          break;
        default:
          capability!.resolve({ done: false, value: value });
          break;
      }
      this._resume();
    }, error => {
      this._current!.reject(error);
      this._current = undefined;
      this._resume();
    });
  }

  protected _throw(error: any) {
    this._settle('throw', error);
  }

  protected _return(value: any) {
    this._settle('return', value);
  }
}
