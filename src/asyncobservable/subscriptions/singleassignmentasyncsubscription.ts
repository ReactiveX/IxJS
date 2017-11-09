import { AsyncSubscription } from '../asyncsubscription';
import { AsyncSubscriptionX } from './asyncsubscriptionx';

const NOOP_PROMISE = Promise.resolve<void>(undefined);

export class SingleAssignmentAsyncSubscription implements AsyncSubscription {
  private _subscription: AsyncSubscription;

  async assign(subscription: AsyncSubscription) {
    const old = this._subscription;
    if (!this._subscription) {
      this._subscription = subscription;
    }

    if (!old) {
      return;
    }
    if (old === AsyncSubscriptionX.empty()) {
      throw new Error('Subscription already assigned');
    }

    await subscription.unsubscribe();
  }

  async unsubscribe() {
    const old = this._subscription;
    this._subscription = AsyncSubscriptionX.empty();
    if (old) {
      await old.unsubscribe();
    } else {
      await NOOP_PROMISE;
    }
  }
}
