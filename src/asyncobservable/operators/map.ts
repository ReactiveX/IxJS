import {
  AsyncObservable,
  AsyncObserver,
  AsyncSubscription,
  OperatorAsyncObservableFunction,
} from '../../interfaces';
import { AsyncObservableX } from '../asyncobservablex';
import { AsyncObserverX } from '../asyncobserverx';
import { subscribeSafe } from '../subscribesafe';

class MapObserver<T, R> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<R>;
  private _selector: (value: T, index: number) => Promise<R> | R;
  private _thisArg?: any;
  private _index: number = 0;

  constructor(
    observer: AsyncObserver<R>,
    selector: (value: T, index: number) => Promise<R> | R,
    thisArg?: any
  ) {
    super();
    this._observer = observer;
    this._selector = selector;
    this._thisArg = thisArg;
  }

  async _next(value: T) {
    let res;
    try {
      res = await this._selector.call(this._thisArg, value, this._index++);
    } catch (e) {
      await this._observer.error(e);
      return;
    }

    await this._observer.next(res);
  }

  async _error(err: any) {
    await this._observer.error(err);
  }

  async _complete() {
    await this._observer.complete();
  }
}

class MapObservable<T, R> extends AsyncObservableX<R> {
  private _source: AsyncObservable<T>;
  private _selector: (value: T, index: number) => Promise<R> | R;
  private _thisArg?: any;

  constructor(
    source: AsyncObservable<T>,
    selector: (value: T, index: number) => Promise<R> | R,
    thisArg?: any
  ) {
    super();
    this._source = source;
    this._selector = selector;
    this._thisArg = thisArg;
  }

  async _subscribeAsync(observer: AsyncObserver<R>): Promise<AsyncSubscription> {
    return await subscribeSafe(
      this._source,
      new MapObserver<T, R>(observer, this._selector, this._thisArg)
    );
  }
}

export function map<TSource, TResult>(
  selector: (value: TSource, index: number) => Promise<TResult> | TResult,
  thisArg?: any
): OperatorAsyncObservableFunction<TSource, TResult> {
  return function mapOperatorFunction(source: AsyncObservable<TSource>) {
    return new MapObservable<TSource, TResult>(source, selector, thisArg);
  };
}
