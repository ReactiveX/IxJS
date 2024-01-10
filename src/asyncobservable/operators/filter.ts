import {
  AsyncObservable,
  AsyncObserver,
  AsyncSubscription,
  MonoTypeOperatorAsyncObservableFunction,
} from '../../interfaces';
import { AsyncObservableX } from '../asyncobservablex';
import { AsyncObserverX } from '../asyncobserverx';
import { subscribeSafe } from '../subscribesafe';

class FilterObserver<T> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<T>;
  private _predicate: (value: T, index: number, signal?: AbortSignal) => Promise<boolean> | boolean;
  private _thisArg?: any;
  private _signal?: AbortSignal;
  private _index: number = 0;

  constructor(
    observer: AsyncObserver<T>,
    predicate: (value: T, index: number, signal?: AbortSignal) => Promise<boolean> | boolean,
    thisArg?: any,
    signal?: AbortSignal
  ) {
    super();
    this._observer = observer;
    this._predicate = predicate;
    this._thisArg = thisArg;
    this._signal = signal;
  }

  async _next(value: T) {
    let shouldYield;
    try {
      shouldYield = await this._predicate.call(this._thisArg, value, this._index++, this._signal);
    } catch (e) {
      await this._observer.error(e);
      return;
    }
    if (shouldYield) {
      await this._observer.next(value);
    }
  }

  async _error(err: any) {
    await this._observer.error(err);
  }

  async _complete() {
    await this._observer.complete();
  }
}

export class FilterObservable<T> extends AsyncObservableX<T> {
  private _source: AsyncObservable<T>;
  private _predicate: (value: T, index: number, signal?: AbortSignal) => Promise<boolean> | boolean;
  private _thisArg?: any;

  constructor(
    source: AsyncObservable<T>,
    predicate: (value: T, index: number, signal?: AbortSignal) => Promise<boolean> | boolean,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
    this._thisArg = thisArg;
  }

  async _subscribeAsync(
    observer: AsyncObserver<T>,
    signal?: AbortSignal
  ): Promise<AsyncSubscription> {
    return await subscribeSafe(
      this._source,
      new FilterObserver<T>(observer, this._predicate, this._thisArg, signal),
      signal
    );
  }
}

export function filter<TSource>(
  predicate: (value: TSource, index: number, signal?: AbortSignal) => Promise<boolean> | boolean,
  thisArg?: any
): MonoTypeOperatorAsyncObservableFunction<TSource> {
  return function filterOperatorFunction(source: AsyncObservable<TSource>) {
    return new FilterObservable<TSource>(source, predicate, thisArg);
  };
}
