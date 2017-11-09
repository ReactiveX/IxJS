import { AsyncObserver, AsyncObserverX, PartialAsyncObserver } from './asyncobserver';
import { AsyncObservable, AsyncObservableX, SafeObserver } from './asyncobservable';
import { AsyncSubscription } from './asyncsubscription';
import { subscribeSafe } from './subscribesafe';

class TapObserver<T> extends AsyncObserverX<T> {
  private _observer: AsyncObserver<T>;
  private _witness: AsyncObserver<T>;

  constructor(observer: AsyncObserver<T>, witness: AsyncObserver<T>) {
    super();
    this._observer = observer;
    this._witness = witness;
  }

  async _next(value: T) {
    try {
      await this._witness.next(value);
    } catch (e) {
      await this._observer.error(e);
      return;
    }

    await this._observer.next(value);
  }

  async _error(err: any) {
    try {
      await this._witness.error(err);
    } catch (e) {
      await this._observer.error(e);
      return;
    }

    await this._observer.error(err);
  }

  async _complete() {
    try {
      await this._witness.complete();
    } catch (e) {
      await this._observer.error(e);
      return;
    }

    await this._observer.complete();
  }
}

class TapObservable<T> extends AsyncObservableX<T> {
  private _source: AsyncObservable<T>;
  private _witness: AsyncObserver<T>;

  constructor(source: AsyncObservable<T>, witness: AsyncObserver<T>) {
    super();
    this._source = source;
    this._witness = witness;
  }

  async _subscribe(observer: AsyncObserver<T>): Promise<AsyncSubscription> {
    return await subscribeSafe(this._source, new TapObserver<T>(observer, this._witness));
  }
}

export function tap<T>(
  source: AsyncObservable<T>,
  witness: PartialAsyncObserver<T>
): AsyncObservableX<T> {
  const observer = new SafeObserver<T>(witness);
  return new TapObservable<T>(source, observer);
}
