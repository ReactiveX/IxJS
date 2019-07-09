import { AsyncUnsubscribable } from './asyncsubscription';

export class SerialAsyncSubscription implements AsyncUnsubscribable {
  private _subscription?: AsyncUnsubscribable;
  private _unsubscribed: boolean = false;

  async assignAsync(subscription: AsyncUnsubscribable) {
    let shouldUnsubscribe = false;
    let old = null;

    if (this._unsubscribed) {
      shouldUnsubscribe = true;
    } else {
      old = this._subscription;
      this._subscription = subscription;
    }

    if (old) {
      await old.unsubscribeAsync();
    }

    if (shouldUnsubscribe && subscription) {
      await subscription.unsubscribeAsync();
    }
  }

  async unsubscribeAsync() {
    let old = null;
    if (!this._unsubscribed) {
      this._unsubscribed = true;
      old = this._subscription;
      this._subscription = undefined;
    }

    if (old) {
      await old.unsubscribeAsync();
    }
  }
}
