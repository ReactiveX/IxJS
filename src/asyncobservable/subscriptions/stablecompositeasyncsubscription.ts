import { AsyncSubscription } from '../asyncsubscription';

export class BinarySubscription implements AsyncSubscription {
  private _first?: AsyncSubscription;
  private _second?: AsyncSubscription;

  constructor(first: AsyncSubscription, second: AsyncSubscription) {
    this._first = first;
    this._second = second;
  }

  async unsubscribe() {
    const old1 = this._first;
    this._first = undefined;
    if (old1) {
      await old1.unsubscribe();
    }

    const old2 = this._second;
    this._second = undefined;
    if (old2) {
      await old2.unsubscribe();
    }
  }
}

export class NArySubscription implements AsyncSubscription {
  private _subscriptions?: AsyncSubscription[];

  constructor(subscriptions: AsyncSubscription[]) {
    this._subscriptions = subscriptions;
  }

  async unsubscribe() {
    const old = this._subscriptions;
    this._subscriptions = undefined;
    if (old) {
      for (const subscription of old) {
        if (subscription) {
          await subscription.unsubscribe();
        }
      }
    }
  }
}
