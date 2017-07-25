import { Subscription } from './subscription';

export interface Scheduler {
  readonly now: number;
  delay(time: number): Promise<void>;
  schedule(
    action: () => void,
    dueTime: number): Subscription;
}

class ActionSubscription implements Subscription {
  public isUnsubscribed = false;
  private _action: () => void;

  constructor(action: () => void) {
    this._action = action;
  }

  unsubscribe() {
    if (!this.isUnsubscribed) {
      this.isUnsubscribed = true;
      this._action();
    }
  }
}

export class DefaultScheduler implements Scheduler {
  get now() {
    return Date.now();
  }

  delay(dueTime: number) {
    return new Promise<void>(res => setTimeout(res, dueTime));
  }

  schedule(action: () => void, dueTime: number): Subscription {
    const id = setTimeout(() => action(), dueTime);
    return new ActionSubscription(() => clearTimeout(id));
  }
}