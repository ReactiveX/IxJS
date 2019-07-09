import { AsyncUnsubscribable } from './types';

export interface AsyncScheduler {
  now: () => number;
  scheduleAsync: (
    action: (signal: AbortSignal) => Promise<void>,
    dueTime?: number
  ) => Promise<AsyncUnsubscribable>;
}
