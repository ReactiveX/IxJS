import { AsyncObserver, AsyncObserverX } from './asyncobserver';
import { AsyncObservable, AsyncObservableX } from './asyncobservable';
import { AsyncSubscription } from './asyncsubscription';
import { subscribeSafe } from './subscribesafe';

class FilterObserver<T> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<T>;
  private _predicate: (value: T, index: number) => Promise<boolean> | boolean;
  private _index: number = 0;

  constructor(
    observer: AsyncObserver<T>,
    predicate: (value: T, index: number) => Promise<boolean> | boolean
  ) {
    super();
    this._observer = observer;
    this._predicate = predicate;
  }

  async _next(value: T) {
    let shouldYield;
    try {
      shouldYield = await this._predicate(value, this._index++);
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

class FilterObservable<T> extends AsyncObservableX<T> {
  private _source: AsyncObservable<T>;
  private _predicate: (value: T, index: number) => Promise<boolean> | boolean;

  constructor(
    source: AsyncObservable<T>,
    predicate: (value: T, index: number) => Promise<boolean> | boolean
  ) {
    super();
    this._source = source;
    this._predicate = predicate;
  }

  async _subscribe(observer: AsyncObserver<T>): Promise<AsyncSubscription> {
    return await subscribeSafe(this._source, new FilterObserver<T>(observer, this._predicate));
  }
}

export function filter<T>(
  source: AsyncObservable<T>,
  predicate: (value: T, index: number) => Promise<boolean> | boolean
): AsyncObservableX<T> {
  return new FilterObservable<T>(source, predicate);
}
