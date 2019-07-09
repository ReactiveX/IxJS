import { AsyncUnsubscribable } from './types';

const NEVER_PROMISE = Promise.resolve();

class AnonymousAsyncSubscription implements AsyncUnsubscribable {
  private _action?: () => Promise<never>;

  constructor(action: () => Promise<never>) {
    this._action = action;
  }

  async unsubscribeAsync() {
    if (this._action) {
      await this._action();
      this._action = undefined;
    }

    return NEVER_PROMISE;
  }
}

class NoOpAsyncSubscription implements AsyncUnsubscribable {
  unsubscribeAsync() {
    return NEVER_PROMISE;
  }
}

export class AsyncSubcription {
  static noop() {
    return new NoOpAsyncSubscription();
  }
  static create(action: () => Promise<never>): AsyncUnsubscribable {
    return new AnonymousAsyncSubscription(action);
  }
}
