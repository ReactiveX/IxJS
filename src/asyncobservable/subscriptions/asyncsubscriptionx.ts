import { AsyncSubscription, SYMBOL_ASYNC_DISPOSABLE } from '../../interfaces';

const NOOP_PROMISE = Promise.resolve<void>(undefined);

class EmptySubscription implements AsyncSubscription {
  async [SYMBOL_ASYNC_DISPOSABLE](): Promise<void> {
    await NOOP_PROMISE;
  }
}

const EMPTY_SUBSCRIPTION = new EmptySubscription();

class AnonymousSubscription implements AsyncSubscription {
  private _fn?: () => Promise<void>;

  constructor(fn: () => Promise<void>) {
    this._fn = fn;
  }

  async [SYMBOL_ASYNC_DISPOSABLE](): Promise<void> {
    if (this._fn) {
      await this._fn!();
      this._fn = undefined;
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
