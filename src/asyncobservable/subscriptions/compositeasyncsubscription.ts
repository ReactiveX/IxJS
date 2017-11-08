import { AsyncSubscription } from '../asyncsubscription';

export class CompositeAsyncSubscription implements AsyncSubscription {
  private _subscriptions: AsyncSubscription[];
  private _unsubscribed: boolean = false;

  constructor(subscriptions?: AsyncSubscription[]) {
    this._subscriptions = subscriptions ? subscriptions : [];
  }

  async add(subscription: AsyncSubscription) {
    let shouldUnsubscribe = false;
    if (this._unsubscribed) {
      shouldUnsubscribe = true;
    } else {
      this._subscriptions.push(subscription);
    }

    if (shouldUnsubscribe) {
      await subscription.unsubscribe();
    }
  }

  async delete(subscription: AsyncSubscription) {
    let shouldUnsubscribe = false;
    const index = this._subscriptions.indexOf(subscription);
    if (!this._unsubscribed && index !== -1) {
      shouldUnsubscribe = true;
      this._subscriptions.splice(index, 1);
    }

    if (shouldUnsubscribe) {
      await subscription.unsubscribe();
    }

    return shouldUnsubscribe;
  }

  async unsubscribe() {
    let subscriptions;
    if (!this._unsubscribed) {
      this._unsubscribed = true;
      subscriptions = this._subscriptions.slice();
      this._subscriptions = [];
    }

    if (subscriptions) {
      const tasks = subscriptions.map(subscription => subscription.unsubscribe());
      await Promise.all(tasks);
    }
  }
}
