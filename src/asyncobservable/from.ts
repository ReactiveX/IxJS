import { AbortError } from '../aborterror';
import { AsyncScheduler, AsyncObserver, AsyncSubscription } from '../interfaces';
import { AsyncObservableX } from './asyncobservablex';

export class FromAsyncIterableAsyncObservable<TSource> extends AsyncObservableX<TSource> {
  private _value: AsyncIterable<TSource>;
  private _scheduler: AsyncScheduler;

  constructor(value: AsyncIterable<TSource>, scheduler: AsyncScheduler) {
    super();
    this._value = value;
    this._scheduler = scheduler;
  }

  _subscribeAsync(
    observer: AsyncObserver<TSource>,
    signal?: AbortSignal
  ): Promise<AsyncSubscription> {
    return this._scheduler.scheduleNowAsync(async (innerSignal) => {
      if (innerSignal.aborted) {
        await observer.error(new AbortError());
        return;
      }

      // TODO: put a try/catch around each next() call
      for await (const item of this._value) {
        await observer.next(item); // TODO: Rendevous?
      }

      if (innerSignal.aborted) {
        await observer.error(new AbortError());
        return;
      }

      await observer.complete();
    }, signal);
  }
}

export class FromIterableAsyncObservable<TSource> extends AsyncObservableX<TSource> {
  private _value: Iterable<TSource>;
  private _scheduler: AsyncScheduler;

  constructor(value: Iterable<TSource>, scheduler: AsyncScheduler) {
    super();
    this._value = value;
    this._scheduler = scheduler;
  }

  _subscribeAsync(
    observer: AsyncObserver<TSource>,
    signal?: AbortSignal
  ): Promise<AsyncSubscription> {
    return this._scheduler.scheduleNowAsync(async (innerSignal) => {
      if (innerSignal.aborted) {
        await observer.error(new AbortError());
        return;
      }

      for await (const item of this._value) {
        await observer.next(item); // TODO: Rendevous?
      }

      if (innerSignal.aborted) {
        await observer.error(new AbortError());
        return;
      }

      await observer.complete();
    }, signal);
  }
}
