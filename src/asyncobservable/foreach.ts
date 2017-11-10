import { AsyncObserverX } from './asyncobserver';
import { AsyncSubscription } from './asyncsubscription';
import { AsyncObservable } from './asyncobservable';
import { SingleAssignmentAsyncSubscription } from './subscriptions/singleassignmentasyncsubscription';
import { bindCallback } from '../internal/bindcallback';

class ForEachObserver<T> extends AsyncObserverX<T> {
  private _onNext: (value: T, index: number) => void;
  private _resolve: (value?: void | PromiseLike<void> | undefined) => void;
  private _reject: (reason?: any) => void;
  private _subscription: AsyncSubscription;
  private _index: number = 0;

  constructor(
    onNext: (value: T, index: number) => void,
    resolve: (value?: void | PromiseLike<void> | undefined) => void,
    reject: (reason?: any) => void,
    subscription: AsyncSubscription
  ) {
    super();
    this._onNext = onNext;
    this._resolve = resolve;
    this._reject = reject;
    this._subscription = subscription;
  }

  async _next(value: T) {
    try {
      await this._onNext(value, this._index++);
    } catch (e) {
      this._reject(e);
      await this._subscription.unsubscribe();
    }
  }

  async _error(err: any) {
    this._reject(err);
    await this._subscription.unsubscribe();
  }

  async _complete() {
    this._resolve(undefined);
    await this._subscription.unsubscribe();
  }
}

export function forEach<T>(
  source: AsyncObservable<T>,
  onNext: (value: T, index: number) => void,
  thisArg?: any
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const subscription = new SingleAssignmentAsyncSubscription();
    const observer = new ForEachObserver<T>(
      bindCallback(onNext, thisArg, 2),
      resolve,
      reject,
      subscription
    );
    const s = await source.subscribe(observer);
    await subscription.assign(s);
  });
}
