import { throwIfAborted } from 'ix/aborterror';
import { AsyncScheduler, AsyncSubscription, SYMBOL_ASYNC_DISPOSABLE } from '../../interfaces';

function normalizeTime(time: number) {
  return time < 0 ? 0 : time;
}

export abstract class AsyncSchedulerX implements AsyncScheduler {
  get now() {
    return Date.now();
  }

  scheduleNowAsync(action: (signal: AbortSignal) => Promise<void>, signal?: AbortSignal) {
    return this._scheduleAsync(action, signal);
  }

  scheduleFutureAsync(
    action: (signal: AbortSignal) => Promise<void>,
    dueTime: number,
    signal?: AbortSignal
  ) {
    const newTime = normalizeTime(dueTime);

    return this._scheduleAsync(async (innerSignal) => {
      await this._delay(newTime, innerSignal);
      await action(innerSignal);
    }, signal);
  }

  async _scheduleAsync(
    action: (signal: AbortSignal) => Promise<void>,
    signal?: AbortSignal
  ): Promise<AsyncSubscription> {
    throwIfAborted(signal);

    const cas = new CancellationAsyncSubscription();
    cas.link(signal);
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

  link(signal?: AbortSignal) {
    if (signal) {
      signal.addEventListener('abort', () => this._controller.abort(), { once: true });
    }
  }

  async [SYMBOL_ASYNC_DISPOSABLE]() {
    this._controller.abort();
  }
}
