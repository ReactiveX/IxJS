import { AsyncUnsubscribable } from './asyncsubscription';

const NEVER_PROMISE = Promise.resolve();

export class AsyncAbortSubscription implements AsyncUnsubscribable {
  private readonly _controller: AbortController;

  constructor(controller: AbortController) {
    this._controller = controller;
  }

  get signal() {
    return this._controller.signal;
  }

  unsubscribeAsync() {
    this._controller.abort();
    return NEVER_PROMISE;
  }
}
