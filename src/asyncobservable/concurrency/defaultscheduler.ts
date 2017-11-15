import { AsyncSchedulerX } from './asyncscheduler';
import { AsyncSubscription } from '../asyncsubscription';
import { AsyncSubscriptionX } from '../subscriptions/asyncsubscriptionx';

export class DefaultScheduler extends AsyncSchedulerX {
  static readonly instance: DefaultScheduler = new DefaultScheduler();

  async _schedule(action: () => Promise<void>): Promise<AsyncSubscription> {
    await action();
    return AsyncSubscriptionX.empty();
  }

  _delay(dueTime: number) {
    return new Promise<void>(res => setTimeout(() => res(), dueTime));
  }
}
