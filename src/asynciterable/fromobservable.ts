'use strict';

import { AsyncIterableX } from '../asynciterable';
import { Observable } from '../observer';

class AsyncObserver<TSource> {
  public values: TSource[];
  public hasError: boolean;
  public errorValue: any;
  public closed: boolean;

  constructor() {
    this.values = [];
    this.hasCompleted = false;
    this.hasError = false;
    this.errorValue = null;
    this.closed = false;
  }

  next(value: TSource) {
    if (!this.closed) {
      this.values.push(value);
    }
  }

  error(err: any) {
    if (!this.closed) {
      this.closed = true;
      this.hasError = true;
      this.errorValue = err;
    }
  }

  complete() {
    if (!this.closed) {
      this.closed = true;
    }
  }
}

class FromObservableAsyncIterable<TSource> extends AsyncIterableX<TSource> {
  private _observable: Observable<TSource>;

  constructor(observable: Observable<TSource>) {
    super();
    this._observable = observable;
  }

  async *[Symbol.asyncIterator]() {
    const observer = new AsyncObserver();
    const subscription = this._observable.subscribe(observer);

    while (1) {
      if (observer.values.length > 0) {
        yield observer.values.shift();
      } else if (observer.stopped) {
        subscription.unsubscribe();
        if (observer.hasError) {
          throw observer.errorValue;
        } else {
          break;
        }
      }
    }
  }
}

export function fromObservable<TSource>(observable: Observable<TSource>) {
  return new FromObservableAsyncIterable<TSource>(observable);
}