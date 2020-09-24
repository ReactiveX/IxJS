import { AsyncSchedulerX } from './asyncschedulerx';
import { delay } from './_delay';

export class MicroTaskAsyncScheduler extends AsyncSchedulerX {
  private static _instance = new MicroTaskAsyncScheduler();
  static get instance() {
    return MicroTaskAsyncScheduler._instance;
  }

  async _scheduleCoreAsync(
    action: (signal: AbortSignal) => Promise<void>,
    signal: AbortSignal
  ): Promise<void> {
    return new Promise<void>((resolve) => {
      resolve(action(signal));
    });
  }
  async _delay(dueTime: number, signal: AbortSignal): Promise<void> {
    await delay(dueTime, signal);
  }
}
