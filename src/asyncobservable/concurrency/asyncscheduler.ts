import { AsyncSubscription } from '../asyncsubscription';

export interface AsyncScheduler {
  now(): number;
  schedule(action: () => Promise<void>, dueTime?: number): Promise<AsyncSubscription>;
}

export abstract class AsyncSchedulerX implements AsyncScheduler {
  now() {
    return Date.now();
  }

  schedule(action: () => Promise<void>, dueTime?: number): Promise<AsyncSubscription> {
    if (dueTime == null) {
      return this._schedule(action);
    } else {
      return this._schedule(async () => {
        const relativeDueTime = this._normalize(dueTime - this.now());
        await this._delay(relativeDueTime);
        await action();
      });
    }
  }

  abstract _schedule(action: () => Promise<void>): Promise<AsyncSubscription>;
  abstract _delay(dueTime: number): Promise<void>;

  private _normalize(span: number) {
    return span < 0 ? 0 : span;
  }
}
