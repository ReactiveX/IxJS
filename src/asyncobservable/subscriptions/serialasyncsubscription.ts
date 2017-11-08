import { AsyncSubscription } from '../asyncsubscription';

export class SerialAsyncSubscription implements AsyncSubscription {
  private _subscription?: AsyncSubscription;
  private _unsubscribed: boolean = false;

  async assign(subscription: AsyncSubscription) {
    let shouldUnsubscribe = false;
    let old;
    if (this._unsubscribed) {
      shouldUnsubscribe = true;
    } else {
      old = this._subscription;
      this._subscription = subscription;
    }

    if (old) {
      await old.unsubscribe();
    }

    if (shouldUnsubscribe && subscription) {
      await subscription.unsubscribe();
    }
  }

  async unsubscribe() {
    let old;
    if (!this._unsubscribed) {
      this._unsubscribed = true;
      old = this._subscription;
      this._subscription = undefined;
    }

    if (old) {
      await old.unsubscribe();
    }
  }
}
