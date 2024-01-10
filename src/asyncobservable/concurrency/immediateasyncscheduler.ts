import { AsyncSchedulerX } from './asyncschedulerx';
import { delay } from './_delay';

export class ImmediateAsyncScheduler extends AsyncSchedulerX {
  private static _instance = new ImmediateAsyncScheduler();
  static get instance() {
    return ImmediateAsyncScheduler._instance;
  }

  async _scheduleCoreAsync(
    action: (signal: AbortSignal) => Promise<void>,
    signal: AbortSignal
  ): Promise<void> {
    await action(signal);
  }

  async _delay(dueTime: number, signal: AbortSignal): Promise<void> {
    await delay(dueTime, signal);
  }
}
