import { AsyncObserver, AsyncObserverX } from './asyncobserver';
import { AsyncObservable, AsyncObservableX } from './asyncobservable';
import { AsyncSubscription } from './asyncsubscription';
import { AsyncSubscriptionX } from './subscriptions/asyncsubscriptionx';

class MapObserver<T, R> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<R>;
  private _selector: (value: T, index: number) => Promise<R> | R;
  private _index: number = 0;

  constructor(observer: AsyncObserver<R>, selector: (value: T, index: number) => Promise<R> | R) {
    super();
    this._observer = observer;
    this._selector = selector;
  }

  async _next(value: T) {
    let res;
    try {
      res = await this._selector(value, this._index++);
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

  constructor(source: AsyncObservable<T>, selector: (value: T, index: number) => Promise<R> | R) {
    super();
    this._source = source;
    this._selector = selector;
  }

  async _subscribe(observer: AsyncObserver<R>): Promise<AsyncSubscription> {
    try {
      return await this._source.subscribe(new MapObserver<T, R>(observer, this._selector));
    } catch (e) {
      await observer.error(e);
      return AsyncSubscriptionX.empty();
    }
  }
}

export function map<T, R>(
  source: AsyncObservable<T>,
  selector: (value: T, index: number) => Promise<R> | R
): AsyncObservableX<R> {
  return new MapObservable<T, R>(source, selector);
}
