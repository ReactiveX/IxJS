import { AsyncSubscription } from '../asyncsubscription';

const NOOP_PROMISE = Promise.resolve<void>(undefined);

class EmptySubscription implements AsyncSubscription {
  async unsubscribe() {
    await NOOP_PROMISE;
  }
}

const EMPTY_SUBSCRIPTION = new EmptySubscription();

class AnonymousSubscription implements AsyncSubscription {
  private _unsubscribe?: () => Promise<void>;

  constructor(unsubscribe: () => Promise<void>) {
    this._unsubscribe = unsubscribe;
  }

  async unsubscribe() {
    if (this._unsubscribe) {
      await this._unsubscribe();
      this._unsubscribe = undefined;
    } else {
      await NOOP_PROMISE;
    }
  }
}

export class AsyncSubscriptionX {
  static create(unsubscribe: () => Promise<void>): AsyncSubscription {
    return new AnonymousSubscription(unsubscribe);
  }

  static empty(): AsyncSubscription {
    return EMPTY_SUBSCRIPTION;
  }
}
