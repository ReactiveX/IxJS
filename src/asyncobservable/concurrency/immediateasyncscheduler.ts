import { AbortError } from '../../aborterror';
import { AsyncSchedulerX } from './asyncschedulerx';

function delay(dueTime: number, signal: AbortSignal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new AbortError());
    }

    const id = setTimeout(() => {
      if (signal.aborted) {
        reject(new AbortError());
      } else {
        resolve();
      }
    }, dueTime);

    signal.addEventListener(
      'abort',
      () => {
        clearTimeout(id);
        reject(new AbortError());
      },
      { once: true }
    );
  });
}

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
