import { AsyncUnsubscribable } from './asyncsubscription';

export class CompositeAsyncSubscribable implements AsyncUnsubscribable {
  private _unsubscribed: boolean;
  private _subscriptions: Array<AsyncUnsubscribable>;

  constructor(subscriptions: Array<AsyncUnsubscribable>) {
    this._subscriptions = subscriptions;
    this._unsubscribed = false;
  }

  async addAsync(subscription: AsyncUnsubscribable) {
    if (this._unsubscribed) {
      await subscription.unsubscribeAsync();
    } else {
      this._subscriptions.push(subscription);
    }
  }

  async removeAsync(subscription: AsyncUnsubscribable) {
    let shouldDispose = false;
    if (!this._unsubscribed) {
      const idx = this._subscriptions.indexOf(subscription);
      if (idx !== -1) {
        this._subscriptions.splice(idx, 1);
        shouldDispose = true;
        await subscription.unsubscribeAsync();
      }
    }

    return shouldDispose;
  }

  async unsubscribeAsync() {
    let subscriptions = null;
    if (!this._unsubscribed) {
      subscriptions = this._subscriptions.slice(0);
      this._subscriptions = [];
    }

    if (subscriptions) {
      const promises = this._subscriptions.map(s => s.unsubscribeAsync());
      await Promise.all(promises);
    }
  }
}
