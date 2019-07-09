import { AsyncUnsubscribable } from './types';

export class SingleAssignmentAsyncSubscription implements AsyncUnsubscribable {
  private _subscription?: AsyncUnsubscribable;
  private _unsubscribed: boolean = false;

  async assign(subscription: AsyncUnsubscribable) {
    if (this._subscription) {
      throw new Error('Disposable has already been assigned');
    }
    let shouldUnsubscribe = this._unsubscribed;
    if (!shouldUnsubscribe) {
      this._subscription = subscription;
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

      if (old) {
        await old.unsubscribeAsync();
      }
    }
  }
}
