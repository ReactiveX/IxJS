import { AsyncScheduler, AsyncSubscription, SYMBOL_ASYNC_DISPOSABLE } from '../../interfaces';

function normalizeTime(time: number) {
  return time < 0 ? 0 : time;
}

export abstract class AsyncSchedulerX implements AsyncScheduler {
  get now() {
    return Date.now();
  }

  scheduleNowAsync(action: (signal: AbortSignal) => Promise<void>) {
    return this._scheduleAsync(action);
  }

  scheduleFutureAsync(action: (signal: AbortSignal) => Promise<void>, dueTime: number) {
    const newTime = normalizeTime(dueTime);

    return this._scheduleAsync(async (signal) => {
      await this._delay(newTime, signal);
      await action(signal);
    });
  }

  async _scheduleAsync(action: (signal: AbortSignal) => Promise<void>): Promise<AsyncSubscription> {
    const cas = new CancellationAsyncSubscription();
    await this._scheduleCoreAsync(action, cas.signal);
    return cas;
  }

  abstract _scheduleCoreAsync(
    action: (signal: AbortSignal) => Promise<void>,
    signal: AbortSignal
  ): Promise<void>;

  abstract _delay(dueTime: number, signal: AbortSignal): Promise<void>;
}

export class CancellationAsyncSubscription implements AsyncSubscription {
  private _controller: AbortController;

  constructor() {
    this._controller = new AbortController();
  }

  get signal() {
    return this._controller.signal;
  }

  async [SYMBOL_ASYNC_DISPOSABLE]() {
    this._controller.abort();
  }
}
