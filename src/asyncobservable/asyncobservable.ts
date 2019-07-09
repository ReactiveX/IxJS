import {
  AsyncUnsubscribable,
  PartialAsyncObserver,
  AsyncObserver,
  AsyncSubscribable
} from './types';
import { AsyncSubscriberBase } from './asyncobserver';
import { AsyncSubcription } from './asyncsubscription';

const ASYNC_NOOP = async () => {
  /* intentionally empty */
};
const ASYNC_THROW = async (err: any) => {
  throw err;
};

function fixObserver<T>(observer: PartialAsyncObserver<T>) {
  if (!observer.nextAsync) {
    observer.nextAsync = ASYNC_NOOP;
  }
  if (!observer.errorAsync) {
    observer.errorAsync = ASYNC_THROW;
  }

  if (!observer.completeAsync) {
    observer.completeAsync = ASYNC_NOOP;
  }

  return observer;
}

class AutoDetachAsyncObserver<T> extends AsyncSubscriberBase<T> implements AsyncUnsubscribable {
  private _observer: PartialAsyncObserver<T>;
  private _subscription?: AsyncUnsubscribable;
  private _promise?: Promise<void>;
  private _unsubscribing: boolean = false;

  constructor(observer: PartialAsyncObserver<T>) {
    super();
    this._observer = fixObserver(observer);
  }

  async nextAsyncCore(value: T) {
    if (this._unsubscribing) {
      return;
    }

    this._promise = this._observer.nextAsync!(value);

    try {
      await this._promise;
    } finally {
      this._promise = undefined;
    }
  }

  async errorAsyncCore(error: any) {
    if (this._unsubscribing) {
      return;
    }

    this._promise = this._observer.errorAsync!(error);

    try {
      await this._promise;
    } finally {
      await this.finishAsync();
    }
  }

  async completeAsyncCore() {
    if (this._unsubscribing) {
      return;
    }

    this._promise = this._observer.completeAsync!();

    try {
      await this._promise;
    } finally {
      await this.finishAsync();
    }
  }

  private async finishAsync() {
    let subscription = null;
    if (!this._unsubscribing) {
      this._unsubscribing = true;
      subscription = this._subscription;
    }

    this._promise = undefined;

    if (subscription) {
      await subscription.unsubscribeAsync();
    }
  }

  async assignAsync(subscription: AsyncUnsubscribable) {
    let shouldUnsubscribe = false;
    if (this._unsubscribing) {
      shouldUnsubscribe = true;
    } else {
      this._subscription = subscription;
    }

    if (shouldUnsubscribe) {
      await subscription.unsubscribeAsync();
    }
  }

  async unsubscribeAsync() {
    let subscription = null;

    if (!this._unsubscribing) {
      this._unsubscribing = true;
      subscription = this._subscription;
    }

    if (subscription) {
      await subscription.unsubscribeAsync();
    }
  }
}

export abstract class AsyncObservableBase<T> implements AsyncSubscribable<T> {
  async subscribeAsync(observer: PartialAsyncObserver<T>): Promise<AsyncUnsubscribable> {
    const autoDetachObserver = new AutoDetachAsyncObserver<T>(observer);
    const subscription = await this.subscribeAsyncCore(autoDetachObserver);
    await autoDetachObserver.assignAsync(subscription);

    return autoDetachObserver;
  }

  async subscribeSafeAsync(observer: AsyncObserver<T>) {
    try {
      return await this.subscribeAsync(observer);
    } catch (err) {
      await observer.errorAsync!(err);
      return AsyncSubcription.noop();
    }
  }

  protected abstract subscribeAsyncCore(observer: AsyncObserver<T>): Promise<AsyncUnsubscribable>;
}

export class AsyncObservable<T> extends AsyncObservableBase<T> {
  private _subscribeAsync: (observer: AsyncObserver<T>) => Promise<AsyncUnsubscribable>;

  constructor(subscribeAsync: (observer: AsyncObserver<T>) => Promise<AsyncUnsubscribable>) {
    super();
    this._subscribeAsync = subscribeAsync;
  }

  protected subscribeAsyncCore(observer: AsyncObserver<T>): Promise<AsyncUnsubscribable> {
    return this._subscribeAsync(observer);
  }
}
